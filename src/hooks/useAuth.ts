import { useEffect } from 'react';
import { IUser, JwtPayload } from './userTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login, logout, refreshToken, register } from '../services/user/auth.services';
import { ILoginData, IRegisterData } from '../components/fragments/userContent/userTypes';
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { resetAuthUser, setAuthUser } from '../redux/authSlice';

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   isAdmin: false,
//   isLoading: true
// };

// export function authReducer(state: AuthState, action: AuthType): AuthState {
//   switch (action.type) {
//     case 'SET_AUTH_USER':
//       return {
//         isAuthenticated: true,
//         user: action.payload,
//         isAdmin: action.payload?.role !== 'USER',
//         isLoading: false
//       };
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// }

export const useAuth = () => {
  // const [state, dispatch] = useReducer(authReducer, initialState);
  const { isAuthenticated, isAdmin, user, isInitialize } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log('USE AUTH');
    console.log('isAuthenticated', isAuthenticated);
    const accessToken = localStorage.getItem('accessToken');
    console.log('IS RUN: ', isInitialize);

    if (accessToken && isInitialize) {
      verifyToken(accessToken);
    } else if (location.pathname.includes('/admin')) {
      navigate('/');
    }

    if (user) {
      if (user.role === 'USER') {
        navigate('/#main');
      } else {
        navigate('/admin/dashboard');
      }
    }
    
  }, [isInitialize]);

  const loginUser = async (data: ILoginData): Promise<{ success: boolean; message: string }> => {
    try {
      const { success, message, token } = await login(data);
      if (success) {
        await verifyToken(token);
        localStorage.setItem('accessToken', token);
      }
      console.log('SUCCESS: ', success);
      console.log('MESSAGE: ', message);
      return { success, message };
    } catch (error) {
      console.error('Error logging in: ', error);
      return { success: false, message: 'Error logging in' };
    }
  };

  const registerUser = async (data: IRegisterData): Promise<string> => {
    return register(data).then(({ success, message }) => {
      if (success) {
        navigate('/login');
      }
      return message;
    });
  };
  const verifyToken = async (token: string): Promise<void> => {
    try {
      console.log('VERIFY TOKEN');
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('DECODED: ', decoded);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && currentTime >= decoded.exp) {
        console.log('Token is expired');
        await refreshAccessToken();
      } else if (decoded.userName && decoded.userRole) {
        const authUser: IUser = {
          name: decoded.userName,
          initialUserName: decoded.userName.charAt(0).toUpperCase(),
          role: decoded.userRole
        };
        store.dispatch(setAuthUser(authUser));
        console.log('initializeUser', authUser);
      } else {
        throw new Error('Invalid token payload');
      }
    } catch (error) {
      console.error('Error in verifyToken:', error);
      throw error;
    }
  };

  const logoutUser = async (): Promise<void> => {
    const { success, message } = await logout();
    if (!success) {
      console.log('Error logging out: ', message);
    }
    const admin: boolean = isAdmin;
    store.dispatch(resetAuthUser());
    localStorage.removeItem('accessToken');
    if (admin) {
      navigate('/login');
    } else {
      navigate('/');
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    console.log('REFRESHING TOKEN');
    const { success, token } = await refreshToken();
    if (!success) {
      await logoutUser();
    } else {
      console.log('TOKEN REFRESHED');
      await verifyToken(token);
    }
  };

  return {
    isAuthenticated,
    isAdmin,
    user,
    verifyToken,
    logoutUser,
    loginUser,
    registerUser,
    refreshAccessToken,
    isInitialize
  };
};

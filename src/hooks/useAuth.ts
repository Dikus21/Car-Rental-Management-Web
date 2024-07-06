import { useEffect, useState } from 'react';
import { IUser } from './userTypes';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getProfile, login, logout, refreshToken, register } from '../services/user/auth.services';
import { ILoginData, IRegisterData } from '../components/fragments/userContent/userTypes';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('USE AUTH');
    console.log('isAuthenticated', isAuthenticated);
    const accessTokenExpiresIn = localStorage.getItem('accessTokenExpiresIn');
    if (
      accessTokenExpiresIn &&
      parseInt(accessTokenExpiresIn) * 1000 > Date.now() &&
      !isAuthenticated
    ) {
      initializeUser();
    } else if (accessTokenExpiresIn && parseInt(accessTokenExpiresIn) * 1000 < Date.now()) {
      refreshAccessToken();
    }
  }, []);

  const loginUser = async (data: ILoginData): Promise<string> => {
    return login(data)
      .then(({ success, message, token }) => {
        if (success) {
          verifyToken(token);
        }
        return message;
      })
      .catch((error) => {
        console.error('Error logging in: ', error);
        return 'Error logging in';
      });
  };

  const registerUser = async (data: IRegisterData): Promise<string> => {
    return register(data).then(({success, message}) => {
      if (success) {
        navigate('/login');
      }
      return message;      
    })
  }
  const initializeUser = async (): Promise<string> => {
    const { success, data } = await getProfile();
    if (!success) return '';
    setIsAuthenticated(true);
    const authUser: IUser = {
      name: data.name,
      initialUserName: data.name.charAt(0).toUpperCase(),
      role: data.role
    };
    setUser(authUser);
    if (data.role === 'USER') {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
    console.log('initializeUser', authUser);
    return data.role;
  };

  const verifyToken = async (token: string) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded) {
        localStorage.setItem('accessTokenExpiresIn', JSON.stringify(decoded.exp));
        await initializeUser().then((role) => {
          if (!role) {
            logoutUser();
          }
          if (role === 'USER') {
            setIsAdmin(false);
            navigate('/');
          } else {
            setIsAdmin(true);
            navigate('/admin/dashboard');
          }

          console.log('User: ', user);
        });
      }
    } catch (error) {
      console.error('Error verifying token: ', error);
      logoutUser();
    }
  };

  const logoutUser = async (): Promise<void> => {
    const { success, message } = await logout();
    if (!success) {
      console.log('Error logging out: ', message);
    }
    setIsAuthenticated(false);
    setUser(null);
    if (isAdmin) {
      setIsAdmin(false);
      navigate('/login');
    }
    localStorage.removeItem('accessTokenExpiresIn');
  };

  const refreshAccessToken = async () => {
    const { success } = await refreshToken();
    if (!success) {
      logoutUser();
    } else {
      if (!isAuthenticated) {
        initializeUser();
      }
    }
  };

  return { isAuthenticated, user, isAdmin, verifyToken, logoutUser, refreshAccessToken, loginUser, registerUser };
};

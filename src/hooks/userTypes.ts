export interface IUser {
    name: string;
    initialUserName: string;
    role: string;
}

export interface JwtPayload {
    userId: number;
    userName: string;
    userEmail: string;
    userRole: string;
    iat: number;
    exp: number;
  }

  export interface AuthState {
    isAuthenticated: boolean,
    user?: IUser | null,
    isAdmin: boolean,
    isLoading: boolean
  }

  export interface AuthType {
    type: string,
    payload?: IUser
  }
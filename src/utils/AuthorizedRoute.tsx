import { Navigate, Outlet } from 'react-router-dom';

export default function AuthorizedRoute() {
  const tokenExpires = localStorage.getItem('accessTokenExpiresIn');
  return tokenExpires ? <Outlet /> : <Navigate to="/login" />;
}

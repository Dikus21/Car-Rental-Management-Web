// import React, { FC, useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// interface AuthorizedRouteProps {
//     children: React.ReactNode;
//     allowedRoles?: string[];
// }

// const AuthorizedRoute: FC<AuthorizedRouteProps> = ({ children, allowedRoles }) => {
//     const { user, isAuthenticated, isLoading } = useAuth();

//     console.log("user", user);
//     console.log("isAuthenticated", isAuthenticated);
//     console.log("isLoading", isLoading);

//     if (isLoading) {
//         console.log("loading");
//         return <div>Loading...</div>;
//     } else if (!isAuthenticated) {
//         return <Navigate to="/login"/>;
//     } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
//         return <Navigate to="/"/>;
//     }

//     return children;
// }

// export default AuthorizedRoute;

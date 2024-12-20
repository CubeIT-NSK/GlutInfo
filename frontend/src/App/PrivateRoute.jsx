// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from './providers/AuthContext';

// const ProtectedRoute = ({ element }) => {
//     const { isAuthenticated, user} = useContext(AuthContext);

//     if (!isAuthenticated) {
//         return <Navigate to="/access-denied"/>;
//     }
//     if ( user && !user.is_verified) {
//         return <Navigate to={`/profile-${user.role}/${user.id}/fill`} />;
//     }

//     return element;
// };

// export default ProtectedRoute;

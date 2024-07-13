import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return user ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;



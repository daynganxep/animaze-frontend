import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function PrivateRoute() {
    const isLoging = useSelector((state) => state.auth.isLoging);

    if (isLoging) {
        return <Outlet />;
    }

    return <Navigate to="/auth/login" replace />;
}

export default PrivateRoute;
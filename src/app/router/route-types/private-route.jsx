import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function PrivateRoute() {
    const logged = useSelector((state) => state.auth.logged);

    if (logged) {
        return <Outlet />;
    }

    return <Navigate to="/auth/login" replace />;
}

export default PrivateRoute;
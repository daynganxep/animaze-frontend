import PublicRoute from "./public-route";
import PrivateRoute from "./private-route";

// import AdminMainLayout from "@/layouts/admin/MainLayout";
// import UserMainLayout from "@/layouts/user/MainLayout";

// import { ROLES } from "@/configs/const.config.jsx";

const ADMIN_ROUTE_TYPES = {
    PUBLIC: PublicRoute,
    PRIVATE: ({ children }) => (
        <PrivateRoute /*AccessDeniedLayout={AdminMainLayout} role={ROLES.ADMIN}*/ >
            {children}
        </PrivateRoute>
    ),
};

const USER_ROUTE_TYPES = {
    PUBLIC: PublicRoute,
    PRIVATE: ({ children }) => (
        <PrivateRoute /* AccessDeniedLayout={UserMainLayout} role={ROLES.USER} */>
            {children}
        </PrivateRoute>
    ),
};

export { ADMIN_ROUTE_TYPES, USER_ROUTE_TYPES };

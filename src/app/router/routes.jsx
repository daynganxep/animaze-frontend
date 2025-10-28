import { createBrowserRouter } from 'react-router-dom';
import { ADMIN_ROUTE_TYPES, USER_ROUTE_TYPES } from '@/app/router/route-types';
import AdminMainLayout from '@/layouts/admin/main-layout';
import UserMainLayout from '@/layouts/user/main-layout';
import NotFound from '@/pages/user/not-found';
import Home from '@/pages/user/home';
import WrapPage from '@/components/ui/wrap-page';

const router = createBrowserRouter([
    {
        element: <ADMIN_ROUTE_TYPES.PRIVATE />,
        children: [
            {
                element: <AdminMainLayout />,
                children: [
                    { path: '/@admin', element: <WrapPage title="Admin Dashboard" Component={Home} /> },
                ],
            },
        ],
    },
    {
        element: <USER_ROUTE_TYPES.PUBLIC />,
        children: [
            {
                element: <UserMainLayout />,
                children: [
                    { path: '/', element: <WrapPage title="Trang chủ" Component={Home} /> },
                    { path: '*', element: <WrapPage title="Không tìm thấy trang" Component={NotFound} /> },
                ],
            },
        ],
    },
], {
    future: {
        v7_startTransition: true
    }
});

export default router;
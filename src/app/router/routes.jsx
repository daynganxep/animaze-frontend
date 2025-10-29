import { createBrowserRouter } from 'react-router-dom';
import { ADMIN_ROUTE_TYPES, USER_ROUTE_TYPES } from '@/app/router/route-types';
import AdminMainLayout from '@/layouts/admin/main-layout';
import UserMainLayout from '@/layouts/user/main-layout';
import NotFound from '@/components/ui/not-found';
import IndexUser from '@/pages/user';
import WrapPage from '@/components/ui/wrap-page';

const router = createBrowserRouter([
    {
        element: <ADMIN_ROUTE_TYPES.PRIVATE />,
        children: [
            {
                element: <AdminMainLayout />,
                children: [
                    { path: '/@admin', element: <WrapPage title="Admin Animaze" Component={IndexUser} /> },
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
                    { path: '/', element: <WrapPage title="Animaze" Component={IndexUser} /> },
                    { path: '*', element: <WrapPage title="Not found" Component={NotFound} /> },
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
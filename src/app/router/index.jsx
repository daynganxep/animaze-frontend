import { RouterProvider } from "react-router-dom";
import routes from "@/app/router/routes";

function Router() {
    return (<RouterProvider router={routes} future={{ v7_startTransition: true, }} />);
}

export default Router;

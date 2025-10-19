import { Outlet } from "react-router-dom";

function MainLayout() {

    return (
        <div>
            <Outlet></Outlet>
            <div>Main layout</div>
        </div>
    );
}

export default MainLayout;
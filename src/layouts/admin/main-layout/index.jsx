import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            MAIN LAYOUT
            <main><Outlet></Outlet></main>
        </div>
    );
}

import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../styles/appLayout.css";

const AppLayout = () => {
    return (
        <>
        <div className="app_layout_container">
            <Header />
            <Outlet />
            <Footer />
        </div>
        </>
    )
}

export default AppLayout;
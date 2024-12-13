import { useEffect } from "react";
import "../styles/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setValidationData } from "../features/validateSlice";

const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.validate);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/user/logout`,{},{withCredentials:true});
            if (res.data.data.isLoggedOut) {
                dispatch(setValidationData(
                    {
                        isLoggedIn: false,
                        email: "",
                        userName: ""
                    }
                ))
                alert("logged out successfully !")
            }
        } catch (error) {
            dispatch(
                setValidationData({
                    isLoggedIn: false,
                    email: "",
                    userName: ""
                })
            )
            alert("failed to logout !!")
        }
    }

    return (
        <>
            <nav className="header_section">
                <div className="inner_header_section">
                    <div className="logo">
                        <span>
                            EmpFeedback
                        </span>
                    </div>
                    {
                        user.isLoggedIn &&
                        <div className="navlinks">
                            <p className={"username"}>{user.userName}</p>
                            <span className={"logout_btn"} onClick={handleLogout}>Logout</span>
                        </div>
                    }
                    {
                        !user.isLoggedIn &&
                        <div className="navlinks">
                            <NavLink to={"/login"} className={"auth_link"}>Login</NavLink>
                            <NavLink to={"/signup"} className={"auth_link"}>Signup</NavLink>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Header;
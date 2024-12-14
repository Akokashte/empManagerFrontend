import React, { useEffect } from "react"
import "../styles/loginPage.css";
import { setUserValues } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setValidationData } from "../features/validateSlice";
import { useNavigate } from "react-router-dom";
import { resetFeedbackArray } from "../features/feedbackSlice";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userCredentials = useSelector(state => state.user)
    const user = useSelector(state => state.validate)

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate("/")
        }
        else {
            dispatch(resetFeedbackArray());
        }
    }, [user])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log(userCredentials)
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/user/login`,
                {
                    email: userCredentials.email,
                    password: userCredentials.password
                },
                { withCredentials: true }
            )

            console.log(res)
            if (res.data.data.user.isLoggedIn) {
                dispatch(setUserValues({
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }))
                dispatch(setValidationData(res.data.data.user));
                alert("logged in successfully !");
                navigate("/");
            }
        } catch (error) {
            alert("invalid credentials !!")
            dispatch(setUserValues({
                userName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }))
        }

    }

    const handleChange = (e) => {
        dispatch(setUserValues({
            ...userCredentials,
            [e.target.name]: e.target.value
        }))
        console.log(userCredentials)

    }

    return (
        <>
            <section className="login_section">
                <form onSubmit={handleLogin}>
                    <div className="label_input_group">
                        <label>Email</label>
                        <input name="email" type="email" placeholder="Enter email here" onChange={handleChange} className="login_input" value={userCredentials.email} />
                    </div>
                    <div className="label_input_group">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Enter email here" onChange={handleChange} className="login_input" value={userCredentials.password} />
                    </div>
                    <div>
                        <input type="submit" value={"Login"} />
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login;
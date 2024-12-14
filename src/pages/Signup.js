import React, { useEffect } from "react"
import "../styles/loginPage.css";
import { setUserValues } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setValidationData } from "../features/validateSlice";
import { useNavigate } from "react-router-dom";
import { resetFeedbackArray } from "../features/feedbackSlice";

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userCredentials = useSelector(state => state.user)
    const user = useSelector(state => state.validate)

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate("/")
        }
        // else {
        //     dispatch(resetFeedbackArray());
        // }
    }, [user])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (userCredentials.password !== userCredentials.confirmPassword) {
                alert("passwords doesnt matches !!")
                return
            }
            console.log("kadka", userCredentials)
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/user/signup`,
                userCredentials,
                { withCredentials: true }
            )

            console.log(res)
            if (res.data.data.user.isLoggedIn) {
                alert("user registered successfully !");
                dispatch(setValidationData(res.data.data.user));
                dispatch(setUserValues({
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }))
                navigate('/')
            }
        } catch (error) {
            alert("invalid credentials or user may already exist !!")
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
                        <label htmlFor="userName">UserName</label>
                        <input name="userName" id="userName" type="text" placeholder="Enter username here" onChange={handleChange} className="login_input" value={userCredentials.userName} />
                    </div>
                    <div className="label_input_group">
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" placeholder="Enter email here" onChange={handleChange} className="login_input" value={userCredentials.email} />
                    </div>
                    <div className="label_input_group">
                        <label htmlFor="password">Password</label>
                        <small className="note">Note :- password should be min 8 digit and should contain at least one number, capital letter and one special character</small>
                        <input name="password" id="password" type="password" placeholder="Enter password here" onChange={handleChange} className="login_input" value={userCredentials.password} />
                    </div>
                    <div className="label_input_group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input name="confirmPassword" id="confirmPassword" type="password" placeholder="Enter confirm password here" onChange={handleChange} className="login_input" value={userCredentials.confirmPassword} />
                    </div>
                    <div>
                        <input type="submit" value={"Signup"} />
                    </div>
                </form>
            </section>
        </>
    )
}

export default Signup;
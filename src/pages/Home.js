import { useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import "../styles/loginPage.css";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFeedbackArrayValue, setFeedbackValues } from "../features/feedbackSlice";
import axios from "axios";

const Home = () => {
    const [addFeedbackClicked, setAddFeedbackClicked] = useState(false)
    const user = useSelector((state) => state.validate);
    const dispatch = useDispatch();
    const { feedback, feedbackArray } = useSelector((state) => state.feedback);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate("/login");
        }
        else {
            if (user.email === "admin@gmail.com") {
                getAllEmployeeFeedbacks()
            }
            getEmployeeFeedbacks();
        }
    }, [user])


    // fetch all feedbacks
    const getAllEmployeeFeedbacks = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/feedback/get`,
                { withCredentials: true }
            );

            if (res.data.success) {
                const feedbackArrayGot = res.data.data;
                dispatch(setFeedbackArrayValue(feedbackArrayGot))
            }
        } catch (error) {
            alert("failed to fetch feedbacks");
        }
    }

    // fetch feedbacks of particular employee
    const getEmployeeFeedbacks = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/feedback/get/logged/user/feedbacks`,
                { withCredentials: true }
            );

            if (res.data.data.isFeedbackFetched) {
                const feedbackArrayGot = res.data.data.feedbacks;
                dispatch(setFeedbackArrayValue(feedbackArrayGot))
            }
        } catch (error) {
            alert("failed to fetch feedbacks");
        }
    }

    const handleChange = (e) => {
        dispatch(setFeedbackValues(
            {
                ...feedback,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/feedback/create`, { feedback }, { withCredentials: true })
            console.log(res);
            if (res.data.data.isFeedbackCreated) {
                alert("feedback created successfully !")
                dispatch(setFeedbackValues(
                    {
                        feedback: ""
                    }
                ))
                setAddFeedbackClicked(!addFeedbackClicked);
                getEmployeeFeedbacks();
            }
        } catch (error) {
            alert("failed to create feedback !!");
            dispatch(setFeedbackValues(
                {
                    feedback: ""
                }
            ))
        }
    }

    return (
        <>
            <div className="home_container">
                <div className="btn_head_wrapper">
                    <h2 className="home_heading">
                        {
                            user.email === "admin@gmail.com" ?
                                "All Feedbacks" :
                                "Your Feedbacks"
                        }
                    </h2>
                    {
                        !(user.email === "admin@gmail.com") &&
                        <div className="add_feedback_btn" onClick={() => setAddFeedbackClicked(!addFeedbackClicked)}>
                            <span>
                                Add feedback
                            </span>
                        </div>
                    }
                </div>
                {
                    !(user.email === "admin@gmail.com")  && addFeedbackClicked &&
                    <div className="feedback_form">
                        <form onSubmit={handleSubmit}>
                            <div className="label_input_group">
                                <label>Feedback</label>
                                <textarea rows={12} name="feedback" type="text" placeholder="Enter feedback here" onChange={handleChange} className="login_input" value={feedback.feedback} required ></textarea>
                            </div>
                            <div>
                                <input type="submit" value={"Submit Feedback"} />
                            </div>
                        </form>
                    </div>
                }
                <div className="all_feedback_wrapper">
                    {
                        feedbackArray.map((curFeedback, index) => {
                            return <FeedbackCard getEmployeeFeedbacks={getEmployeeFeedbacks} getAllEmployeeFeedbacks={getAllEmployeeFeedbacks} setAddFeedbackClicked={setAddFeedbackClicked} key={index} feedback={curFeedback} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home;
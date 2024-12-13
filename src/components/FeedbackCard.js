import "../styles/feedbackCard.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FeedbackCard = ({ getEmployeeFeedbacks, getAllEmployeeFeedbacks, feedback, setAddFeedbackClicked }) => {
    const [updateClicked, setUpdateClicked] = useState(false)
    const [feedbackId, setFeedbackId] = useState(null);
    const [updatedFeedback, setUpdatedFeedback] = useState({
        feedback: ""
    });
    const user = useSelector((state)=>state.user);

    const formatDate = (dateString) => {
        const date = new Date(dateString); // Convert the MongoDB date string to a Date object
        const formattedDate = new Intl.DateTimeFormat('en-GB').format(date); // This formats the date as DD/MM/YYYY

        return formattedDate.split('/').reverse().join('/'); // To get YYYY/MM/DD format
    };

    const handleDelete = async (feedbackId) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/feedback/delete`,
                {
                    withCredentials: true,
                    data: {
                        feedbackId
                    }
                }
            )

            if (res.data.data.isFeedbackDeleted) {
                alert("feedback deleted successfully !");
                if (user.email === "admin@gmail.com") {
                    getAllEmployeeFeedbacks();
                }
                else {
                    getEmployeeFeedbacks();
                }
            }

        } catch (error) {
            alert("failed to delete feedback !!");
        }
    }

    const handleChange = (e) => {
        setUpdatedFeedback({
            ...updatedFeedback,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdateClicked = (feedback) => {
        setFeedbackId(feedback._id);
        setUpdatedFeedback({ feedback: feedback.feedback })
        setUpdateClicked(!updateClicked)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("hare", updatedFeedback, feedbackId)
            const res = await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/feedback/update`,
                {
                    feedbackId,
                    feedbackUpdatedData: updatedFeedback
                },
                {
                    withCredentials: true
                }
            );
            console.log(res)
            if (res.data.data.isFeedbackUpdated) {
                alert("feedback updated successfully !");
                getEmployeeFeedbacks();
                setUpdateClicked(!updateClicked)
            }
        } catch (error) {
            alert("failed to update feedback !!")
        }
    }

    return (
        <>
            <div className="feedback_card">
                <div className="feedback_data">
                    <p className="feedback_text">{feedback.feedback}</p>
                    <span className="feedback_date">{formatDate(feedback.updatedAt)}</span>
                </div>
                <div className="crud_btns">
                    <span className="delete_btn" onClick={() => handleDelete(feedback._id)}>Delete</span>
                    {
                        !(user.email === "admin@gmail.com") &&
                        <span className="edit_btn" onClick={() => handleUpdateClicked(feedback)}>Edit</span>
                    }
                </div>
                {
                    updateClicked &&
                    <div className="feedback_form" style={{ width: "100%" }}>
                        <form onSubmit={handleUpdate}>
                            <div className="label_input_group">
                                <label>Feedback</label>
                                <textarea rows={12} name="feedback" type="text" placeholder="Enter feedback here" onChange={handleChange} className="login_input" value={updatedFeedback.feedback} required ></textarea>
                            </div>
                            <div>
                                <input type="submit" value={"Update Feedback"} />
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default FeedbackCard;
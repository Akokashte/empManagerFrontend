import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedback: "",
    feedbackArray: []
}

const feedbackSlice = new createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedbackValues: (state, action) => {
            const { feedback } = action.payload
            state.feedback = feedback
        },
        setFeedbackArrayValue: (state, action) => {
            state.feedbackArray = action.payload.reverse();
        }
    }
})


export const { setFeedbackValues, setFeedbackArrayValue } = feedbackSlice.actions;
export default feedbackSlice.reducer;
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
        },
        resetFeedbackArray: (state, action) => {
            state.feedbackArray = []
        }
    }
})


export const { setFeedbackValues, setFeedbackArrayValue, resetFeedbackArray } = feedbackSlice.actions;
export default feedbackSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: "",
    userName: ""
}

const validateSlice = new createSlice({
    name: "validator",
    initialState,
    reducers: {
        setValidationData: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.email = action.payload.email
            state.userName = action.payload.userName
        }
    }
})

export const { setValidationData } = validateSlice.actions;
export default validateSlice.reducer;


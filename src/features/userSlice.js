import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const userSlice = new createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserValues: (state, action) => {
            const { userName, email, password, confirmPassword } = action.payload
            state.email = email
            state.userName = userName
            state.password = password
            state.confirmPassword = confirmPassword
        }
    }
})


export const { setUserValues } = userSlice.actions;
export default userSlice.reducer;
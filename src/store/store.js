import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import validateReducer from "../features/validateSlice";
import feedbackReducer from "../features/feedbackSlice";

export const store = configureStore(
    {
        reducer: {
            user:userReducer,
            validate:validateReducer,
            feedback:feedbackReducer
        }
    }
)


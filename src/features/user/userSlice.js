import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initial = {
    currentUser: null
}
export const userSlice = createSlice({
    name: "user",
    initialState: initial,
    reducers: {
        userIn: (state, action) => {
            console.log(action.payload);
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        },
        getUserFromStorage: (state) => {
            state.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }
})
export const { userIn, userOut, getUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
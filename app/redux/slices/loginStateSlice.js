const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    loginState : ""
};

const loginStateSlice = createSlice({
    name: "log",
    initialState,
    reducers: {

        handleLoginStatus: (state, action) => {
            console.log("Action: ",action);
            state.loginState = action.payload
        },


    },
});

export const {handleLoginStatus} = loginStateSlice.actions;
export default loginStateSlice.reducer
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    refundState : "",
    refundBookingState : ""
};

const refundStateSlice = createSlice({
    name: "refund",
    initialState,
    reducers: {

        handleRefundSelect: (state, action) => {
            console.log("Action: ",action);
            state.refundState = action.payload
        },

        handleRefundBooking: (state, action) => {
            console.log("Action: ",action);
            state.refundBookingState = action.payload
        },


    },
});

export const {handleRefundSelect, handleRefundBooking} = refundStateSlice.actions;
export default refundStateSlice.reducer
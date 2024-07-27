const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    // price: {}
    price: []
}

const editroompriceSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        addinputs: (state, action) => {
            console.log(action, "action")
            // state.price = action.payload;
            // console.log(state.price, "state")

            // state.price[action.payload.i] = action.payload.value;
            // console.log(state.price, "state")

            const updatedItem = action.payload;
            const existingIndex = state.price.findIndex(item => item._id === updatedItem._id);
            if (existingIndex !== -1) {
                state.price[existingIndex] = updatedItem;
            } else {
                state.price.push(updatedItem);
            }
        }
    }
})

export const { addinputs } = editroompriceSlice.actions;
export default editroompriceSlice.reducer
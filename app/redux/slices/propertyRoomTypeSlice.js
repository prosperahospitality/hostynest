const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    property_res: '',
};

const propertyRoomTypeSlice = createSlice({
    name: "propRes",
    initialState,
    reducers: {

        handlePropRes: (state, action) => {
            console.log("Action: ",action);
            state.property_res = action.payload
        },

    },
});

export const {handlePropRes} = propertyRoomTypeSlice.actions;
export default propertyRoomTypeSlice.reducer
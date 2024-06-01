const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    selectedPosition: {},
    pinnedLoc: '',
    pinnedCoords: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {

        handleSetSelectPosition: (state, action) => {
            console.log("Action: ",action);
            state.selectedPosition = action.payload
        },

        pinnedLocation :  (state, action) => {
            console.log("Action: ",action);
            state.pinnedLoc = action.payload
        },

        pinnedCoordinates : (state, action) => {
            console.log("Action: ",action);
            state.pinnedCoords = action.payload
        },
    },
});

export const {handleSetSelectPosition, pinnedLocation, pinnedCoordinates} = searchSlice.actions;
export default searchSlice.reducer
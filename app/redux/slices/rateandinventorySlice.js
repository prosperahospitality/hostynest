const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    formattedDateRange: [],
    selectedRoom: '',
    quickSold: [],
    quickSoldFormattedDate: [],
    quickSoldSelectedRadio: '',
    quickSoldFormattedDateCopy: [],
    updateBulkProperty: '',
    formattedDateUpdateProp: [],
    formattedDateUpdatePropCopy: [],
    selectedRoomUpdateProperty: '',
    selectedRadioUpdateProp: '',
    quickSoldFlag: '',
    updatePropArray: [],
    updateRoomArray: [],
    formattedDateUpdateRoom: [],
    selectedRoomUpdateRooms: '',
    valueTotalRoom: '',

    selectedRoomUpdateRate: '',
    formattedDateUpdateRate: [],
    value3HourRate: '',
    value6HourRate: '',
    value12HourRate: '',
    valueBaseRate: '',
    valueChildRate: '',
    valueExtraPersonRate: '',
    updateRateArray: [],

    checkPricePerGuest: '',
};

const rateandinventorySlice = createSlice({
    name: "rateandinventory",
    initialState,
    reducers: {

        handleFormattedDateRange: (state, action) => {
            console.log("Action: ",action);
            state.formattedDateRange = action.payload
        },

        handleSelectedRoom :  (state, action) => {
            console.log("Action: ",action);
            state.selectedRoom = action.payload
        },

        handleQuickSold :  (state, action) => {
            console.log("Action: ",action);
            state.quickSold = action.payload
        },

        handleQuickSoldFormattedDate :  (state, action) => {
            console.log("Action: ",action);
            state.quickSoldFormattedDate = action.payload
        },

        handleQuickSoldFormattedDateCopy : (state, action) => {
            console.log("Action: ",action);
            state.quickSoldFormattedDateCopy = action.payload
        },

        handleQuickSoldSelectedRadio :  (state, action) => {
            console.log("Action: ",action);
            state.quickSoldSelectedRadio = action.payload
        },

        removeQuickSoldFormattedDate : (state, action) => {
            console.log("Action: ",action);
            state.quickSoldFormattedDate = action.payload
        },

        handleUpdateBulkProperty: (state, action) => {
            console.log("Action: ",action);
            state.updateBulkProperty = action.payload
        },

        handleFormattedDateUpdateProp: (state, action) => {
            console.log("Action: ",action);
            state.formattedDateUpdateProp = action.payload
        },

        handleFormattedDateUpdatePropCopy: (state, action) => {
            console.log("Action: ",action);
            state.formattedDateUpdatePropCopy = action.payload
        },

        handleSelectedRoomUpdateProperty: (state, action) => {
            console.log("Action: ",action);
            state.selectedRoomUpdateProperty = action.payload
        },

        handleSelectedRadioUpdateProp: (state, action) => {
            console.log("Action: ",action);
            state.selectedRadioUpdateProp = action.payload
        },

        handleQuickSoldFlag: (state, action) => {
            console.log("Action: ",action);
            state.quickSoldFlag = action.payload
        },

        handleUpdatePropArray: (state, action) => {
            console.log("Action: ",action);
            state.updatePropArray = action.payload
        },

        handleUpdateRoomArray: (state, action) => {
            console.log("Action: ",action);
            state.updateRoomArray = action.payload
        },

        handleFormattedDateUpdateRoom: (state, action) => {
            console.log("Action: ",action);
            state.formattedDateUpdateRoom = action.payload
        },

        handleSelectedRoomUpdateRoom: (state, action) => {
                    console.log("Action: ",action);
                    state.selectedRoomUpdateRooms = action.payload
                },
                
        handleValueUpdateRoom: (state, action) => {
                    console.log("Action: ",action);
                    state.valueTotalRoom = action.payload
                },


    
                handleFormattedDateUpdateRate: (state, action) => {
                    console.log("Action: ",action);
                    state.selectedRoomUpdateRate = action.payload
                },

                handleSelectedRoomUpdateRate: (state, action) => {
                    console.log("Action: ",action);
                    state.formattedDateUpdateRate = action.payload
                },

                handleValue3HourRate: (state, action) => {
                    console.log("Action: ",action);
                    state.value3HourRate = action.payload
                },

                handleValue6HourRate: (state, action) => {
                    console.log("Action: ",action);
                    state.value6HourRate = action.payload
                },

                handleValue12HourRate: (state, action) => {
                    console.log("Action: ",action);
                    state.value12HourRate = action.payload
                },

                handleValueBaseRate: (state, action) => {
                    console.log("Action: ",action);
                    state.valueBaseRate = action.payload
                },

                handleValueChildRate: (state, action) => {
                    console.log("Action: ",action);
                    state.valueChildRate = action.payload
                },

                handleValueExtraPersonRate: (state, action) => {
                    console.log("Action: ",action);
                    state.valueExtraPersonRate = action.payload
                },

                handleUpdateRateArray: (state, action) => {
                    console.log("Action: ",action);
                    state.updateRateArray = action.payload
                },

                handleCheckPricePerGuest: (state, action) => {
                    console.log("Action: ",action);
                    state.checkPricePerGuest = action.payload
                },


    },
});

export const {handleFormattedDateRange, handleSelectedRoom, handleQuickSold, handleQuickSoldFormattedDate ,handleQuickSoldSelectedRadio, removeQuickSoldFormattedDate, handleQuickSoldFormattedDateCopy, handleUpdateBulkProperty, handleFormattedDateUpdateProp, handleFormattedDateUpdatePropCopy, handleSelectedRoomUpdateProperty, handleSelectedRadioUpdateProp, handleQuickSoldFlag, handleUpdatePropArray, handleUpdateRoomArray, handleFormattedDateUpdateRoom,
    handleSelectedRoomUpdateRoom,
    handleValueUpdateRoom,
    
    handleFormattedDateUpdateRate,
    handleSelectedRoomUpdateRate,
    handleValue3HourRate,
    handleValue6HourRate,
    handleValue12HourRate,
    handleValueBaseRate,
    handleValueChildRate,
    handleValueExtraPersonRate,
    handleUpdateRateArray,

    handleCheckPricePerGuest} = rateandinventorySlice.actions;
export default rateandinventorySlice.reducer
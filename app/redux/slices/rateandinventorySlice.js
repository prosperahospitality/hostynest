const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    formattedDateRange: [],
    selectedRoom: '',
    selectedRoomKey: '',
    selectedRoomDetails: {},
    quickSold: false,
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
    inventoryTable: [],
    quickSoldRoomKey: '',



    /////////////////////Bulk Update/////////////////////

    updateBulkProperty: '',
    formattedDateUpdateProperty: [],
    selectedBulkRadio: '',
    selectedRoomUpdatePropertyKey: '',
    selectedChecksUpdateProp: [],
    selectedBulkUpdateTab: '',


    formattedDateUpdateRate: [],
    selectedRoomUpdateRateKey: '',
    enteredBulkUpdateRate: {},
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

        handleSelectedRoomKey :  (state, action) => {
            console.log("Action: ",action);
            state.selectedRoomKey = action.payload
        },



        handleQuickSoldFormattedDateCopy : (state, action) => {
            console.log("Action: ",action);
            state.quickSoldFormattedDateCopy = action.payload
        },



        removeQuickSoldFormattedDate : (state, action) => {
            console.log("Action: ",action);
            state.quickSoldFormattedDate = action.payload
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

                handleSelectedRoomDetails: (state, action) => {
                    console.log("Action: ",action);
                    state.selectedRoomDetails = action.payload
                },

                handleInventoryTable: (state, action) => {
                    console.log("Action: ",action);
                    state.inventoryTable = action.payload
                },

                /////////////////////Quick Sold Out/////////////////////

                handleQuickSoldFormattedDate :  (state, action) => {
                    state.quickSoldFormattedDate = action.payload
                },

                handleQuickSoldSelectedRadio :  (state, action) => {
                    state.quickSoldSelectedRadio = action.payload
                },

                handleQuickSold :  (state, action) => {
                    state.quickSold = action.payload
                },

                handleQuickSoldRoomKey :  (state, action) => {
                    state.quickSoldRoomKey = action.payload
                },

                /////////////////////Bulk Update/////////////////////

                handleUpdateBulkProperty: (state, action) => {
                    state.updateBulkProperty = action.payload
                },

                handleFormattedDateUpdateProperty: (state, action) => {
                    state.formattedDateUpdateProperty = action.payload
                },

                handleSelectedBulkRadio: (state, action) => {
                    state.selectedBulkRadio = action.payload
                },

                handleSelectedRoomUpdatePropertyKey: (state, action) => {
                    state.selectedRoomUpdatePropertyKey = action.payload
                },

                handleSelectedChecksUpdateProp: (state, action) => {
                    state.selectedChecksUpdateProp = action.payload
                },

                handleSelectedBulkUpdateTab: (state, action) => {
                    state.selectedBulkUpdateTab = action.payload
                },





                handleFormattedDateUpdateRate: (state, action) => {
                    state.formattedDateUpdateRate = action.payload
                },

                handleSelectedRoomUpdateRateKey: (state, action) => {
                    state.selectedRoomUpdateRateKey = action.payload
                },

                handleEnteredBulkUpdateRate: (state, action) => {
                    state.enteredBulkUpdateRate = action.payload
                },
                




    },
});

export const { handleFormattedDateUpdateRate, 
    handleSelectedRoomUpdateRateKey, 
    handleEnteredBulkUpdateRate, handleSelectedBulkUpdateTab, handleSelectedChecksUpdateProp, handleFormattedDateUpdateProperty, handleSelectedBulkRadio, handleSelectedRoomUpdatePropertyKey, handleQuickSoldRoomKey, handleFormattedDateRange, handleSelectedRoom, handleSelectedRoomKey, handleSelectedRoomDetails, handleQuickSold, handleQuickSoldFormattedDate ,handleQuickSoldSelectedRadio, removeQuickSoldFormattedDate, handleQuickSoldFormattedDateCopy, handleUpdateBulkProperty, handleFormattedDateUpdateProp, handleFormattedDateUpdatePropCopy, handleSelectedRoomUpdateProperty, handleSelectedRadioUpdateProp, handleQuickSoldFlag, handleUpdatePropArray, handleUpdateRoomArray, handleFormattedDateUpdateRoom,
    handleSelectedRoomUpdateRoom,
    handleValueUpdateRoom,
    

    handleValue3HourRate,
    handleValue6HourRate,
    handleValue12HourRate,
    handleValueBaseRate,
    handleValueChildRate,
    handleValueExtraPersonRate,
    handleUpdateRateArray,

    handleCheckPricePerGuest, handleInventoryTable} = rateandinventorySlice.actions;
export default rateandinventorySlice.reducer
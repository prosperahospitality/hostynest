const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    currentStep: 1,
    propertyType: {},
    placeType: {},
    locationInfo: {},
    amenitiesInfo: {},
    houserules: {},
    combinedData: {},
};

const onboardingformSlice = createSlice({
    name: "onboardingform",
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        updatePropertyType: (state, action) => {
            state.propertyType = { ...state.propertyType, ...action.payload };
            state.combinedData = {
              ...state.combinedData,
              ...action.payload,
            };
        },
        updatePlaceType: (state, action) => {
            state.placeType = { ...state.placeType, ...action.payload };
            state.combinedData = {
              ...state.combinedData,
              ...action.payload,
            };
        },
        updateLocationInfo: (state, action) => {
            state.locationInfo = { ...state.locationInfo, ...action.payload };
            state.combinedData = {
              ...state.combinedData,
              ...action.payload,
            };
        },
        updateAmenities: (state, action) => {
            state.amenitiesInfo = { ...state.amenitiesInfo, ...action.payload };
            state.combinedData = {
              ...state.combinedData,
              ...action.payload,
            };
        },
        updateHouseRules: (state, action) => {
            state.houserules = { ...state.houserules, ...action.payload };
            state.combinedData = {
              ...state.combinedData,
              ...action.payload,
            };
        },
        updateCombinedData: (state, action) => {
            // Merge personalInfo and shippingInfo into combinedData
            state.combinedData = {
              ...state.propertyType,
              ...state.placeType,
              ...state.locationInfo,
              ...state.amenitiesInfo,
              ...state.houserules,
              ...action.payload,
            };
        },
    },
});

export const {setCurrentStep, updatePropertyType, updatePlaceType, updateLocationInfo, updateAmenities, updateHouseRules, updateCombinedData} = onboardingformSlice.actions;
export default onboardingformSlice.reducer
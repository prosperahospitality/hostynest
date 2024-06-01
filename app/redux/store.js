import { configureStore } from "@reduxjs/toolkit";
import onboardingFormSlice from "@/app/redux/slices/onboardingFormSlice"
import searchSlice from "@/app/redux/slices/searchSlice"
import propertyRoomTypeSlice from "@/app/redux/slices/propertyRoomTypeSlice"
import selectedChecksSlice from "@/app/redux/slices/selectedChecksSlice"
import loginStateSlice from "@/app/redux/slices/loginStateSlice"
import refundStateSlice from "@/app/redux/slices/refundSlice"
import rateandinventorySlice from "@/app/redux/slices/rateandinventorySlice"

export const store = configureStore({
  reducer: {
    onboardingform:onboardingFormSlice,
    search:searchSlice,
    propRes:propertyRoomTypeSlice,
    checks:selectedChecksSlice,
    log:loginStateSlice,
    refund:refundStateSlice,
    rateandinventory:rateandinventorySlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import customizationSlice from "./slices/customizationSlice";

const store = configureStore({
    reducer : {
        customization : customizationSlice.reducer
    }
})


export default store
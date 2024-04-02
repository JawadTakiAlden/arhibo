import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open : ['dashboard']
}

const customizationSlice = createSlice({
    name : 'customizationSlice',
    initialState,
    reducers : {
        SET_OPEN : (state , action) => {
            state.open = [action.payload]
        }
    }
})


export default customizationSlice

export const {SET_OPEN} = customizationSlice.actions
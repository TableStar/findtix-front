import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const citySlice = createSlice({
    name: "city",
    initialState: {
        cities: []
    },
    reducers: {
        setCities: (state, action) => {
            state.cities = action.payload
        }
    }
})

export const { setCities } = citySlice.actions
export default citySlice.reducer

// Middleware
export const getCities = (query = "") => {
    return async (dispatch) => {
        try {
            const resp = await API_CALL.get(`/cities/${query}`)
            dispatch(setCities(resp.data.result))
        } catch (error) {
            console.log(error);
        }
    }
}
import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: []
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const {setCategories} = categorySlice.actions
export default categorySlice.reducer

// Middleware
export const getCategories = () => {
    return async (dispatch) => {
        try {
            const resp = await API_CALL.get(`/categories`)
            dispatch(setCategories(resp.data))
        } catch (error) {
            console.log(error);
        }
    }
}
import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload
        }
    }
})

export const { setEvents } = eventSlice.actions
export default eventSlice.reducer

// Middleware
export const getEvents = (query = "") => {
    return async(dispatch) => {
        try {
            const resp = await API_CALL.get(`/events/upcoming${query}`)
            dispatch(setEvents(resp.data))
        } catch (error) {
            console.log(error);
        }
    }
}
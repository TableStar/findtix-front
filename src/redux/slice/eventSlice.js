import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [],
        totalEvents: 0,
        searchEvents: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload.result
            state.totalEvents = action.payload.totalResult
        },
        setSearchEvents: (state,action) => {
            state.searchEvents = action.payload.result
        }
    }
})

export const { setEvents, setSearchEvents } = eventSlice.actions
export default eventSlice.reducer

// Middleware
export const getEvents = (query = "") => {
    return async(dispatch) => {
        try {
            const resp = await API_CALL.get(`/events/upcoming${query}`)
            dispatch(setEvents(resp.data))
            console.log("🚀 ~ file: eventSlice.js:29 ~ returnasync ~ resp:", resp)
        } catch (error) {
            console.log(error);
        }
    }
}
export const getSearchEvents = (query = "") => {
    return async(dispatch) => {
        try {
            const resp = await API_CALL.get(`/events/upcoming${query}&limit=4`)
            dispatch(setSearchEvents(resp.data))
        } catch (error) {
            console.log(error);
        }
    }
}
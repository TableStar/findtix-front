import {configureStore} from "@reduxjs/toolkit"
import eventReducer from "./slice/eventSlice"
import categoryReducer from "./slice/categorySlice"
const globalState = configureStore({
    reducer: {
        eventReducer,
        categoryReducer
    }
})

export default globalState;

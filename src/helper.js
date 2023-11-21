import axios from "axios";

export const API_CALL = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getToken = () => {
    return localStorage.getItem("token");
};
export const removeToken = () => {
    localStorage.removeItem("token");
};
export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const API_URL = import.meta.env.VITE_API_URL;

export const filterDate = (filter,city) => {
    let currentDate = new Date()
    const currentTime = `${currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours()}:${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()}:${currentDate.getSeconds() < 10 ? "0" + currentDate.getSeconds() : currentDate.getSeconds()}`
    let startDate = `${currentDate.toLocaleDateString('af-ZA')}T${currentTime}`
    let endDate = ""
    switch (filter) {
        case "today":
            endDate = `${currentDate.toLocaleDateString('af-ZA')}T23:59:59`
            break;
        case "tomorrow":
            currentDate.setDate(currentDate.getDate() + 1)
            startDate = `${currentDate.toLocaleDateString('af-ZA')}T00:00:00`
            endDate = `${currentDate.toLocaleDateString('af-ZA')}T23:59:59`
            break
        case "this week":
            let day = currentDate.getDay()
            if (day === 0) {
                endDate = `${currentDate.toLocaleDateString('af-ZA')}T23:59:59`
            } else if (day === 6) {
                currentDate.setDate(currentDate.getDate() + 1)
                endDate = `${currentDate.toLocaleDateString('af-ZA')}T23:59:59`
            } else {
                let temp = 7 - day
                currentDate.setDate(currentDate.getDate() + temp)
                endDate = `${currentDate.toLocaleDateString('af-ZA')}T23:59:59`
            }
            break
        case "this month":
            let year = currentDate.getFullYear()
            let month = currentDate.getMonth()
            let endOfMonth = new Date(year, month + 1, 0)
            endDate = `${endOfMonth.toLocaleDateString('af-ZA')}T23:59:59`
            break
        default:
            break;
    }
    return `?startDate=${startDate}&endDate=${endDate}&city=${city}`
}
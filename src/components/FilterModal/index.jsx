import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import "./style.css"
import { useNavigate } from "react-router-dom";

const FilterModal = (props) => {
    const navigate = useNavigate()
    const [filterVisible, setFilterVisible] = React.useState(false)
    const categoryDatabase = useSelector((state) => { return state.categoryReducer.categories })

    const [query, setQuery] = React.useState({})
    const generateQuery = () => {
        const keys = Object.keys(query)
        const res = keys.map((key) => {
            return `${key}=${query[key]}`
        })
        navigate(`/search?${res.join("&")}`)
    }

    useEffect(() => {
        setFilterVisible(props.visible)
    }, [props.visible])

    return <div className="filter-modal w-screen h-screen overflow-scroll bg-white absolute left-0 z-20 px-3"
        style={{ display: filterVisible ? "block" : "none", top: props.position }}>
        <div className="flex flex-row items-center w-full sticky top-0 justify-between bg-white py-2">
            <h1 className="font-semibold text-2xl">Filters</h1>
            <div onClick={props.onClickClose} className="w-[36px] h-[36px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                <IoClose className="text-[24px]" />
            </div>
        </div>
        <div className="py-4 flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-medium">Date</h1>
                <div className="flex flex-col gap-3 py-4 px-1">
                    <input type="radio" value={"today"} id="today" name="date-filter"
                        onClick={() => { setQuery({ ...query, date: "today" }) }} />
                    <label htmlFor="today" className="flex">Today</label>
                    <input type="radio" value={"tomorrow"} id="tomorrow" name="date-filter"
                        onClick={() => { setQuery({ ...query, date: "tomorrow" }) }} />
                    <label htmlFor="tomorrow" className="flex">Tomorrow</label>
                    <input type="radio" value={"this-week"} id="this-week" name="date-filter"
                        onClick={() => { setQuery({ ...query, date: "this-week" }) }} />
                    <label htmlFor="this-week" className="flex">This week</label>
                    <input type="radio" value={"this-month"} id="this-month" name="date-filter"
                        onClick={() => { setQuery({ ...query, date: "this-month" }) }} />
                    <label htmlFor="this-month" className="flex">This month</label>
                </div>
            </div>
            <div>
                <h1 className="text-lg font-medium">Price</h1>
                <div className="flex flex-col gap-3 py-4 px-1">
                    <input type="radio" value={"free"} id="free" name="price-filter"
                        onClick={() => { setQuery({ ...query, price: "free" }) }} />
                    <label htmlFor="free" className="flex">Free</label>
                    <input type="radio" value={"paid"} id="paid" name="price-filter"
                        onClick={() => { setQuery({ ...query, price: "today" }) }} />
                    <label htmlFor="paid" className="flex">Paid</label>
                </div>
            </div>
            <div>
                <h1 className="text-lg font-medium">Category</h1>
                <div className="flex flex-col gap-3 py-4 px-1">
                    {categoryDatabase.map(({ name }, index) => {
                        return <div key={index}>
                            <input type="radio" value={name} id={name} name="category-filter"
                                onClick={() => { setQuery({ ...query, category: name.toLowerCase() }) }} />
                            <label htmlFor={name} className="flex">{name}</label>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div className="bottom-0 bg-white w-full flex justify-center py-2" style={{ position: props.position === "0vh" ? "sticky" : "static" }}>
            <button className="bg-[#d2633b] text-white rounded-md py-2 text-center w-[90%]"
            onClick={() => { 
                generateQuery() 
                props.onClickView("100vh")
                }}>
                View event results
            </button>
        </div>
    </div>
}

export default FilterModal;
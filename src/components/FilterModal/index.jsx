import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import "./style.css"
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterModal = (props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [filterVisible, setFilterVisible] = React.useState(false)
    const categoryDatabase = useSelector((state) => { return state.categoryReducer.categories })

    const dateSection = useRef()
    const categorySection = useRef()
    const priceSection = useRef()

    const [query, setQuery] = React.useState({})

    const generateQuery = () => {
        const keys = Object.keys(query)
        let res = keys.map((key) => {
            return `${key}=${query[key]}`
        })
        navigate(`/search?${res.join("&")}`)
    }

    useEffect(() => {
        setFilterVisible(props.visible)
    }, [props.visible])

    useEffect(() => {
        let temp = {}
        for (const entry of searchParams.entries()) {
            const [param, value] = entry
            temp[param] = value
        }
        setQuery(temp)
    }, [props.visible])

    return <div className="filter-modal w-screen h-screen overflow-scroll bg-white absolute left-0 z-20 px-3"
        style={{ display: filterVisible ? "block" : "none", top: props.position }}>
        <div className="flex flex-col w-full sticky top-0  bg-white py-2">
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="font-semibold text-2xl">Filters</h1>
                <div className="w-[36px] h-[36px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        let temp = {}
                        for (const entry of searchParams.entries()) {
                            const [param, value] = entry
                            temp[param] = value
                        }
                        setQuery(temp)
                        props.onClickClose1("100vh")
                        setTimeout(() => { props.onClickClose2(false) }, 1000)
                    }}>
                    <IoClose className="text-[24px]" />
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3 py-3 overflow-scroll">
                {Object.keys(query).map((value, index) => {
                    if (value === "page" || value === "name") { return false }
                    return <div key={index} className="flex flex-row justify-between items-center gap-4 bg-gray-100 w-fit px-4 py-2 rounded-full">
                        <p>{query[value].replace(query[value][0], query[value][0]?.toUpperCase()).replaceAll("-", " ").replaceAll("and", "&")}</p>
                        <IoClose className="text-[22px] cursor-pointer" onClick={() => {
                            let temp = { ...query }
                            delete temp[value]
                            setQuery(temp)
                        }} />
                    </div>
                })}
            </div>
        </div>
        <div className="py-4 flex flex-col gap-6">
            <div ref={dateSection}>
                <h1 className="text-lg font-medium">Date</h1>
                <div className="flex flex-col gap-3 py-4 px-1">
                    <input type="radio" value={"today"} id="today" name="date-filter" checked={query.date === "today"}
                        onClick={() => { setQuery({ ...query, date: "today" }) }} />
                    <label htmlFor="today" className="flex">Today</label>
                    <input type="radio" value={"tomorrow"} id="tomorrow" name="date-filter" checked={query.date === "tomorrow"}
                        onClick={() => { setQuery({ ...query, date: "tomorrow" }) }} />
                    <label htmlFor="tomorrow" className="flex">Tomorrow</label>
                    <input type="radio" value={"this-week"} id="this-week" name="date-filter" checked={query.date === "this-week"}
                        onClick={() => { setQuery({ ...query, date: "this-week" }) }} />
                    <label htmlFor="this-week" className="flex">This week</label>
                    <input type="radio" value={"this-month"} id="this-month" name="date-filter" checked={query.date === "this-month"}
                        onClick={() => { setQuery({ ...query, date: "this-month" }) }} />
                    <label htmlFor="this-month" className="flex">This month</label>
                </div>
            </div>
            <div ref={priceSection}>
                <h1 className="text-lg font-medium">Price</h1>
                <div className="flex flex-col gap-3 py-4 px-1">
                    <input type="radio" value={"free"} id="free" name="price-filter" checked={query.price === "free"}
                        onClick={() => { setQuery({ ...query, price: "free" }) }} />
                    <label htmlFor="free" className="flex">Free</label>
                    <input type="radio" value={"paid"} id="paid" name="price-filter" checked={query.price === "paid"}
                        onClick={() => { setQuery({ ...query, price: "paid" }) }} />
                    <label htmlFor="paid" className="flex">Paid</label>
                </div>
            </div>
            <div ref={categorySection}>
                <h1 className="text-lg font-medium">Category</h1>
                <div className="flex flex-col gap-3 py-4 px-1">
                    {categoryDatabase.map(({ name }, index) => {
                        return <div key={index}>
                            <input type="radio" value={name} id={name} name="category-filter" checked={query.category === name.toLowerCase().replaceAll("&", "and")}
                                onClick={() => { setQuery({ ...query, category: name.toLowerCase().replaceAll("&", "and") }) }} />
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
                    props.onClickClose1("100vh")
                    setTimeout(() => { props.onClickClose2(false) }, 1000)
                }}>
                View event results
            </button>
        </div>
    </div>
}

export default FilterModal;
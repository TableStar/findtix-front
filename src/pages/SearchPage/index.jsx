import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../redux/slice/citySlice";
import LayoutPage from "../../components/LayoutPage";
import { AiOutlineSearch, AiOutlineArrowRight } from "react-icons/ai"
import { BiCurrentLocation } from "react-icons/bi"
import { MdMyLocation, MdOutlineLiveTv } from "react-icons/md";
import { IoFilterSharp, IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useRef } from "react";
import EventCards from "../../components/EventCards";
import Event404 from "../../components/Event404";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getEvents } from "../../redux/slice/eventSlice";
import { getLocation } from "../../helper";
import FilterModal from "../../components/FilterModal";
import "./style.css"
const SearchPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const inputSearch = useRef();
    const [filterModalVisible, setFilterModalVisible] = React.useState(false)
    const [filterPosition, setFilterPosition] = React.useState("100vh")

    const openModal = () => {
        setFilterModalVisible(true)
        setTimeout(() => { setFilterPosition("0vh") }, 50)
    }

    const cities = useSelector((state) => { return state.cityReducer.cities })
    const eventDatabase = useSelector((state) => { return state.eventReducer.events })
    const totalEvents = useSelector((state) => { return state.eventReducer.totalEvents })
    const categoryDatabase = useSelector((state) => { return state.categoryReducer.categories })

    const [query1, setQuery1] = React.useState({})
    const [selectedCity, setSelectedCity] = React.useState("Surabaya")
    const [showCities, setShowCities] = React.useState("none")
    const inCity = React.useRef()

    useEffect(() => {
        let tempQuery = {}
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            tempQuery[param] = value
        }
        setQuery1(tempQuery)
    }, [])

    useEffect(() => {
        if (Object.keys(query1).length) {
            let res = Object.keys(query1).map((key) => { return `${key}=${query1[key]}` })
            navigate(`/search?${res.join("&")}`)
        }
    }, [query1])

    useEffect(() => {
        let tempQuery = {}
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            tempQuery[param] = value
        }
        let res = Object.keys(tempQuery).map((key) => { return `${key}=${tempQuery[key]}` })
        dispatch(getEvents(`?city=${selectedCity}${"&" + res.join("&")}`))
    }, [location.search, selectedCity])

    return <LayoutPage>
        <div className="search-page px-4 min-h-[100vh] md:flex md:flex-row relative">
            <FilterModal visible={filterModalVisible} position={filterPosition} query={query1}
                onClickClose1={setFilterPosition} onClickClose2={setFilterModalVisible} />
            <div className="md:w-full lg:w-[68vw] h-full">
                <div className="search-page-header w-full flex justify-between py-4 border-b-2 items-center">
                    <div>
                        <div className="search-input flex flex-row max-w-[350px] gap-4 items-center">
                            <AiOutlineSearch className="text-[32px]" />
                            <input type="text" className="py-2 border-b-[4px] w-[80%] text-[25px]" placeholder="Search for anything" ref={inputSearch} />
                            <div className="cursor-pointer md:hidden rounded-full hover:bg-gray-200 p-2 transition ease duration-300">
                                <AiOutlineArrowRight className="text-[32px]" onClick={() => {
                                    if (inputSearch.current.value) { setQuery1({ ...query1, name: inputSearch.current.value }) }
                                    else {
                                        const temp = { ...query1 }
                                        delete temp.name
                                        setQuery1(temp)
                                    }
                                }} />
                            </div>
                        </div>
                        <div className="search-input relative">
                            <div className="search-input flex flex-row items-center gap-4">
                                <BiCurrentLocation className="text-[32px]" />
                                <input type="text" ref={inCity} className="py-2 border-b-[4px] text-[25px] w-[200px]" placeholder={selectedCity} defaultValue={selectedCity}
                                    onClick={() => {
                                        inCity.current.value = "";
                                        setShowCities("block")
                                        dispatch(getCities())
                                    }}
                                    onChange={() => { dispatch(getCities(`?name=${inCity.current.value}`)) }} />
                            </div>
                            <div style={{ display: showCities }} className="search-input-btn city-result flex flex-col absolute z-10 bg-white text-[16px] font-normal w-[60vw] max-w-[350px]">
                                <div className="flex flex-row items-center gap-3 border-b-[1px] p-3 md:px-4 border-gray-300 cursor-pointer"
                                    onClick={async () => {
                                        setShowCities("none")
                                        inCity.current.placeholder = "Loading..."
                                        let city = await getLocation()
                                        setSelectedCity(city)
                                        inCity.current.value = city
                                        inCity.current.placeholder = city
                                    }}><MdMyLocation className="text-[22px]" /> Use my current location</div>
                                <div className="flex flex-row items-center gap-3 border-b-[1px] p-3 md:px-4 border-gray-300 cursor-pointer"
                                    onClick={() => {
                                        setShowCities("none")
                                        setSelectedCity("Online events")
                                        inCity.current.value = "Online events"
                                    }}><MdOutlineLiveTv className="text-[22px]" /> Browse online events</div>
                                {cities.map((value, index) => {
                                    return <p className="border-b-[1px] p-3 md:px-4 border-gray-300 cursor-pointer "
                                        onClick={() => {
                                            setShowCities("none")
                                            setSelectedCity(value.name)
                                            inCity.current.value = value.name
                                        }} key={index}>{value.name}</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <button className="hidden md:flex text-lg font-medium border-2 border-gray-400 py-2 px-8 rounded-md tracking-wide"
                        onClick={() => {
                            if (inputSearch.current.value) { setQuery1({ ...query1, name: inputSearch.current.value }) }
                            else {
                                const temp = { ...query1 }
                                delete temp.name
                                setQuery1(temp)
                            }
                        }}>
                        Search
                    </button>
                </div>
                <div className="search-page-content md:flex mt-4">
                    <div className="search-page-filters md:hidden flex items-center gap-2 overflow-scroll">
                        <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer"
                            style={Object.keys(query1).length > (query1.name ? 2 : 1) ? { backgroundColor: "#3D64FF", color: "white" } : {}}
                            onClick={openModal}>
                            <IoFilterSharp className="text-xl" />
                            <span>Filters</span>
                        </div>
                        <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer whitespace-nowrap"
                            style={query1.date ? { backgroundColor: "#3D64FF", color: "white", order: "1" } : { order: "2" }}
                            onClick={openModal}>
                            <span>{query1.date ? query1.date.replace(query1.date[0], query1.date[0].toUpperCase()).replace("-", " ") : "Date"}</span>
                            <IoIosArrowDown />
                        </div>
                        <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer whitespace-nowrap"
                            style={query1.price ? { backgroundColor: "#3D64FF", color: "white", order: "1" } : { order: "2" }}
                            onClick={openModal}>
                            <span>{query1.price ? query1.price.replace(query1.price[0], query1.price[0].toUpperCase()) : "Price"}</span>
                            <IoIosArrowDown />
                        </div>
                        <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer whitespace-nowrap"
                            style={query1.category ? { backgroundColor: "#3D64FF", color: "white", order: "1" } : { order: "2" }}
                            onClick={openModal}>
                            <span>{query1.category ? query1.category.replace(query1.category[0], query1.category[0].toUpperCase()).replace("and", "&") : "Category"}</span>
                            <IoIosArrowDown />
                        </div>
                    </div>
                    <div className="search-page-filters-desktop hidden md:flex md:w-[20vw] flex-col gap-2">
                        <h1 className="text-2xl font-semibold mb-4">Filters</h1>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-medium">Date</h1>
                            <div className="flex flex-col gap-3 py-4 px-1">
                                <input type="radio" value={"today"} id="today1" name="date-filter" checked={query1.date === "today"}
                                    onClick={() => { setQuery1({ ...query1, date: "today", page: 1 }) }} />
                                <label htmlFor="today1" className="flex">Today</label>
                                <input type="radio" value={"tomorrow"} id="tomorrow1" name="date-filter" checked={query1.date === "tomorrow"}
                                    onClick={() => { setQuery1({ ...query1, date: "tomorrow", page: 1 }) }} />
                                <label htmlFor="tomorrow1" className="flex">Tomorrow</label>
                                <input type="radio" value={"this-week"} id="this-week1" name="date-filter" checked={query1.date === "this-week"}
                                    onClick={() => { setQuery1({ ...query1, date: "this-week", page: 1 }) }} />
                                <label htmlFor="this-week1" className="flex">This week</label>
                                <input type="radio" value={"this-month"} id="this-month1" name="date-filter" checked={query1.date === "this-month"}
                                    onClick={() => { setQuery1({ ...query1, date: "this-month", page: 1 }) }} />
                                <label htmlFor="this-month1" className="flex">This month</label>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-medium">Price</h1>
                            <div className="flex flex-col gap-3 py-4 px-1">
                                <input type="radio" value={"free"} id="free1" name="price-filter" checked={query1.price === "free"}
                                    onClick={() => { setQuery1({ ...query1, price: "free", page: 1 }) }} />
                                <label htmlFor="free1" className="flex">Free</label>
                                <input type="radio" value={"paid"} id="paid1" name="price-filter" checked={query1.price === "paid"}
                                    onClick={() => { setQuery1({ ...query1, price: "paid", page: 1 }) }} />
                                <label htmlFor="paid1" className="flex">Paid</label>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-medium">Category</h1>
                            <div className="flex flex-col gap-3 py-4 px-1">
                                {categoryDatabase.map(({ name }, index) => {
                                    return <div key={index}>
                                        <input type="radio" value={name} id={name + "123"} name="category-filter" checked={query1.category === name.toLowerCase().replaceAll("&", "and")}
                                            onClick={() => { setQuery1({ ...query1, category: name.toLowerCase().replaceAll("&", "and"), page: 1 }) }} />
                                        <label htmlFor={name + "123"} className="flex">{name}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[80vw] lg:w-[50vw]">
                        {eventDatabase.length ? <div className="event-cards-section md:hidden flex flex-col gap-6 flex-wrap mt-6">
                            {eventDatabase.map((value, index) => {
                                return <EventCards key={index} src={value.img} title={value.name} startDate={value.startDate}
                                    location={value.location ? `${value.location}, ${value.city.name}` : value.city.name}
                                    price={value.ticketTypes[0] ? value.ticketTypes[0].price : "Free"}
                                    onClick={() => navigate(`/e/${value.id}`)} />
                            })} </div> : <div className="block md:hidden"><Event404 /></div>}
                        {Object.keys(query1).length - (query1.name ? 2 : 1) ? <div className="hidden md:flex items-center gap-4 overflow-scroll">
                            <p>{Object.keys(query1).length - (query1.name ? 2 : 1)} filter applied</p>
                            {Object.keys(query1).map((value) => {
                                if (value !== "page" && value !== "name") {
                                    return <div className="flex items-center gap-1 bg-slate-200 px-4 py-2 rounded-3xl">
                                        <p>{query1[value].replaceAll("-", " ").replace(query1[value][0], query1[value][0].toUpperCase())}</p>
                                        <IoCloseSharp className="cursor-pointer" onClick={() => {
                                            const temp = { ...query1 }
                                            delete temp[value]
                                            temp.page = 1
                                            setQuery1(temp)
                                        }} />
                                    </div>
                                }
                            })}
                            <p className="text-blue-700 cursor-pointer" onClick={() => {
                                setQuery1({ page: 1 })
                                inputSearch.current.value = ""
                            }}>Clear All</p>
                        </div> : ""}
                        {eventDatabase.length ? <div className="event-cards-section-desktop hidden md:flex flex-col gap-6 flex-wrap mt-6 pr-10">
                            {eventDatabase.map((value, index) => {
                                let date = new Date(value.startDate).toDateString().split(" ")
                                date[1] = `${date[1]} ${date[2]}`
                                date.splice(2, 1)
                                date = date.join(", ")
                                let time = value.startDate.split("T")[1].split(".")[0].split(":")
                                time = time[0] + ":" + time[1]
                                return <div key={index} className="search-event-cards flex flex-row w-[100%] md:h-[25vh] cursor-pointer rounded-sm overflow-scroll "
                                    onClick={() => { navigate(`/e/${value.id}`) }}>
                                    <img src={value.img} className="w-[50%] h-[100%] object-cover" />
                                    <div className="flex flex-col justify-center gap-1 w-[50%] px-4 py-2">
                                        <h1 className="text-[20px] font-medium">{value.name}</h1>
                                        <p className="text-[#cb3c09]">{date + ", " + time}</p>
                                        <p className="text-gray-500 font-normal">{value.location ? value.location : "Online event"}</p>
                                    </div>
                                </div>
                            })} </div> : <div className="hidden md:block"><Event404 /></div>}
                        {eventDatabase.length ? <div className="w-full flex flex-row gap-4 items-center justify-center pt-10 pb-4 font-semibold">
                            {1 < query1.page && query1.page >= Math.ceil(parseInt(totalEvents) / 8) ? <IoIosArrowBack className="cursor-pointer text-2xl"
                                onClick={() => {
                                    setQuery1({ ...query1, page: parseInt(query1.page) - 1 })
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }} /> : <div></div>}
                            <span className="flex gap-2 text-lg">{query1.page}
                                <span className="font-normal">of</span>
                                <span>{Math.ceil(parseInt(totalEvents) / 8)}</span>
                            </span>
                            {query1.page < Math.ceil(parseInt(totalEvents) / 8) ? <IoIosArrowForward className="cursor-pointer text-2xl"
                                onClick={() => {
                                    setQuery1({ ...query1, page: parseInt(query1.page) + 1 })
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }} /> : <div></div>}
                        </div> : <div></div>}
                        {eventDatabase.length ? <div className="hidden md:block">Showing <span className="font-semibold">{((query1.page - 1) * 8) + 1} - {((query1.page - 1) * 8) + eventDatabase.length}</span> of <span className="font-semibold">{totalEvents}</span> <span className="text-[#d2633b]">public events</span></div> : ""}
                    </div>
                </div>
            </div>
            <div className="peta hidden lg:flex w-[30vw] min-h-[100vh] fixed right-0 z-0">
                <img src="https://vemaps.com/uploads/img/large/id-04.jpg " className="cover" />
            </div>
        </div>
    </LayoutPage>
}
export default SearchPage;
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../redux/slice/citySlice";
import LayoutPage from "../../components/LayoutPage";
import { AiOutlineSearch, AiOutlineArrowRight } from "react-icons/ai"
import { BiCurrentLocation } from "react-icons/bi"
import { MdMyLocation, MdOutlineLiveTv } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect } from "react";
import EventCards from "../../components/EventCards";
import Event404 from "../../components/Event404";
import { useLocation, useNavigate } from "react-router-dom";
import { getEvents } from "../../redux/slice/eventSlice";
import { getLocation } from "../../helper";
import FilterModal from "../../components/FilterModal";
const SearchPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [filterModalVisible, setFilterModalVisible] = React.useState(false)
    const [filterPosition, setFilterPosition] = React.useState("100vh")

    const cities = useSelector((state) => { return state.cityReducer.cities })
    const eventDatabase = useSelector((state) => { return state.eventReducer.events })

    const [selectedCity, setSelectedCity] = React.useState("Surabaya")
    const [showCities, setShowCities] = React.useState("none")
    const inCity = React.useRef()

    useEffect(() => {
        dispatch(getEvents(`?city=${selectedCity}`))
    }, [location.search, selectedCity])
    return <LayoutPage>
        <div className="search-page px-4">
            <FilterModal visible={filterModalVisible} position={filterPosition}
                onClickClose={() => {
                    setFilterPosition("100vh")
                    setTimeout(() => { setFilterModalVisible(false) }, 1000)
                }}
                onClickView={setFilterPosition}
            />
            <div className="search-page-header py-4 border-b-2">
                <div className="search-input flex flex-row max-w-[350px] gap-4 items-center">
                    <AiOutlineSearch className="text-[32px]" />
                    <input type="text" className="py-2 border-b-[4px] w-[80%] text-[25px]" placeholder="Search for anything" />
                    <AiOutlineArrowRight className="text-[32px] cursor-pointer" />
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
            <div className="search-page-content mt-4">
                <div className="search-page-filters flex items-center gap-2 overflow-scroll">
                    <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer"
                        onClick={() => {
                            setFilterModalVisible(true)
                            setTimeout(() => { setFilterPosition("0vh") }, 150)
                        }}>
                        <IoFilterSharp className="text-xl" />
                        <span>Filters</span>
                    </div>
                    <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer">
                        <span>Date</span>
                        <IoIosArrowDown />
                    </div>
                    <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer">
                        <span>Category</span>
                        <IoIosArrowDown />
                    </div>
                    <div className="flex items-center text-lg gap-2 border-[2.5px] rounded-full w-fit px-4 py-2 cursor-pointer">
                        <span>Price</span>
                        <IoIosArrowDown />
                    </div>
                </div>
                {eventDatabase.length ? <div className="event-cards-section flex flex-col gap-6 flex-wrap mt-6"> {eventDatabase.map((value, index) => {
                    return <EventCards key={index} src={value.img} onClick={() => navigate(`/e/${value.id}`)}
                        title={value.name}
                        startDate={value.startDate}
                        location={value.location ? `${value.location}, ${value.city.name}` : value.city.name}
                        price={value.ticketTypes[0] ? value.ticketTypes[0].price : "Free"} />
                })} </div> : <Event404 />}
            </div>

        </div>
    </LayoutPage>
}

export default SearchPage;
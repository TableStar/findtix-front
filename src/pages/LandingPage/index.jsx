import React, { useEffect } from "react";
import CategoryButton from "../../components/CategoryButton";
import LayoutPage from "../../components/LayoutPage";
import Tabs from "../../components/Tabs";
import "./style.css";
import EventCards from "../../components/EventCards";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/slice/eventSlice";
import Event404 from "../../components/Event404";
import { IoIosArrowDown } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { MdMyLocation, MdOutlineLiveTv } from "react-icons/md";
import { getCities } from "../../redux/slice/citySlice";
import { API_CALL, API_URL, getLocation } from "../../helper";
import PromotorCard from "../../components/PromotorCard";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const tabsType = ["All", "Online", "Free", "Today", "Tomorrow", "This-week", "This-month", "Music", "Health"]
    const eventDatabase = useSelector((state) => { return state.eventReducer.events })
    console.log("🚀 ~ file: index.jsx:23 ~ LandingPage ~ eventDatabase:", eventDatabase)
    const categoryDatabase = useSelector((state) => { return state.categoryReducer.categories })
    const cities = useSelector((state) => { return state.cityReducer.cities })
    const userGlobal = useSelector((state) => state.accountSliceReducer);
    console.log("🚀 ~ file: index.jsx:27 ~ LandingPage ~ userGlobal:", userGlobal)
    const [listPromotor, setListPromotor] = React.useState([])
    const [selectedCity, setSelectedCity] = React.useState("Surabaya")
    const [showCities, setShowCities] = React.useState("none")
    const inCity = React.useRef()

    const [activeTab, setActiveTab] = React.useState("All")
    useEffect(() => {
        const filter = location.search.replace("%20", " ").split("=")[1]
        setTimeout(() => {
            if (!filter) { dispatch(getEvents(`?city=${selectedCity}`)) }
            else if (filter === "online") { dispatch(getEvents("?city=online")) }
            else if (filter === "free") { dispatch(getEvents(`?price=0&city=${selectedCity}`)) }
            else if (filter === "today" || filter === "tomorrow" || filter === "this-week" || filter === "this-month") {
                dispatch(getEvents(`?date=${filter}&city=${selectedCity}`))
            }
            else if (filter === "music" || filter === "health") { dispatch(getEvents(`?category=${filter}&city=${selectedCity}`)) }
            setActiveTab(filter || "all")
        }, 50)
    }, [location.search, selectedCity])

    const getPromotor = async () => {
        const res = await API_CALL.get("/promotors")
        setListPromotor(res.data)
    }

    useEffect(() => { getPromotor() }, [])
    console.log(listPromotor);
    return <LayoutPage selectedCity={selectedCity} >
        <div id="landing-page" className="text-sm md:text-base lg:text-lg w-[100vw]">
            <section className="banner-section w-full relative" >
                <img className="hidden md:block w-full"
                    src="./src/assets/25a38e26b1ef7e31365d99862199fffe-Eventbrite_Halloween_HomepageB_1919x543.webp" />
                <img className="block md:hidden w-full"
                    src="./src/assets/35438e16c769f0813d6ae1d23c444b12-Eventbrite_Halloween_HomepageB_659x494.webp" />
                <button className="bg-[#d2633b] text-white py-2 px-4 rounded-sm absolute bottom-4 left-3 md:left-10"
                    onClick={() => { navigate("/search?page=1") }}>
                    Find your next event
                </button>
            </section>

            <section className="category-section flex items-center md:justify-around h-[25vh] md:h-[35vh] w-full overflow-x-scroll bg-slate-100 px-2 py-3 gap-4" >
                {categoryDatabase.map((value, index) => {
                    return <CategoryButton key={index} category={value.name} src={value.imgUrl} onClick={() => { navigate(`/search?category=${value.name.replaceAll("&", "and")}&page=1`) }} />
                })}
            </section>

            <section className="content-section flex flex-col w-full px-4 sm:px-16 gap-2">
                <div className="tabs-area flex items-center w-full py-3 overflow-scroll">
                    <ul className="flex flex-row h-fit w-fit gap-4 text-base" >
                        {tabsType.map((value, index) => {
                            return <Tabs key={index} text={value.replace("-", " ")} class={activeTab === value.toLowerCase() ? "active" : ""}
                                onClick={() => { navigate(value.toLowerCase() === 'all' ? `` : `?filter=${value.toLowerCase()}`) }} />
                        })}
                    </ul>
                </div>

                <div className="content-event-list flex flex-col py-2 gap-4">
                    <div className="flex flex-row items-center gap-4">
                        <h1 className="font-bold text-[26px]" >Popular in</h1>
                        <div className="search-input flex flex-row items-center gap-2">
                            <IoIosArrowDown className="text-[#d2633b]" fontSize={"24px"} />
                            <div className="search-input relative">
                                <input type="text" className="border-b-[4px] text-[25px] w-[180px]" ref={inCity} placeholder={selectedCity} defaultValue={selectedCity}
                                    onClick={() => {
                                        inCity.current.value = "";
                                        setShowCities("block")
                                        dispatch(getCities())
                                    }}
                                    onChange={() => { dispatch(getCities(`?name=${inCity.current.value}`)) }}
                                />
                                <div style={{ display: showCities }} className="search-input-btn city-result flex flex-col absolute z-[1] bg-white text-[16px] font-normal w-[50vw] max-w-[275px]">
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
                    </div>
                    {eventDatabase.length ? <div className="event-cards-section flex flex-col md:flex-row gap-6 md:gap-6 flex-wrap"> {eventDatabase.map((value, index) => {
                        return <EventCards key={index} src={value.img} onClick={() => navigate(`/e/${value.id}`)}
                            title={value.name} username={value.auth.username}
                            startDate={value.startDate}
                            location={value.location ? `${value.location}, ${value.city.name}` : value.city.name}
                            price={value.ticketTypes[0] ? value.ticketTypes[0].price : "Free"} />
                    })} </div> : <Event404 />}
                    <button className="w-[50%] max-w-[300px] m-auto mt-2 border-[2.5px] rounded-[4px] border-slate-400 px-4 py-2"
                        onClick={() => { navigate("/search?page=1") }}>
                        See more
                    </button>
                </div>

                <div className="promoter-list flex flex-col w-full">
                    <h1 className="flex items-center gap-3 font-semibold text-2xl">
                        <IoPeople className="text-[40px]" />Popular organizers
                    </h1>
                    <div className="flex flex-row gap-6 overflow-x-scroll py-8 px-4 h-fit w-full">
                        {listPromotor?.map((value) => {
                            return <PromotorCard name={value.username} followers={Math.ceil(Math.random() * 1000)}
                            img={value.usersProperty?.profileImage ? `${API_URL}/public/profilepic/${value.usersProperty.profileImage}` : ""}
                            onClick={() => navigate(`/promotor-events/${value.id}`)} />
                        })}
                    </div>
                </div>
            </section>
        </div>
    </LayoutPage>
};

export default LandingPage;

import React, { useEffect } from "react";
import CategoryButton from "../../components/CategoryButton";
import LayoutPage from "../../components/LayoutPage";
import Tabs from "../../components/Tabs";
import "./style.css"
import EventCards from "../../components/EventCards";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/slice/eventSlice";
import Event404 from "../../components/Event404";
import { IoIosArrowDown } from "react-icons/io";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const tabsType = ["All", "Online", "Free", "Today", "Tomorrow", "This week", "This month", "Music", "Health"]
    const eventDatabase = useSelector((state) => { return state.eventReducer.events })
    const categoryDatabase = useSelector((state) => { return state.categoryReducer.categories })

    const [activeTab, setActiveTab] = React.useState("All")
    useEffect(() => {
        const filter = location.search.replace("%20", " ").split("=")[1]
        setTimeout(() => {
            if (!filter) { dispatch(getEvents()) }
            else if (filter === "online") { dispatch(getEvents("?city=online")) }
            else if (filter === "free") { dispatch(getEvents("?price=0")) }
            else if (filter === "today" || filter === "tomorrow" || filter === "this week" || filter === "this month") {
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
                dispatch(getEvents(`?startDate=${startDate}&endDate=${endDate}`))
            } else if (filter === "music" || filter === "health") { dispatch(getEvents(`?category=${filter}`)) }
            setActiveTab(filter || "all")
        }, 50)
    }, [location.search])


    return <LayoutPage>
        <div id="landing-page" className="text-sm md:text-base lg:text-lg">
            <section className="banner-section w-full relative" >
                <img className="hidden md:block w-full"
                    src="./src/assets/25a38e26b1ef7e31365d99862199fffe-Eventbrite_Halloween_HomepageB_1919x543.webp" />
                <img className="block md:hidden w-full"
                    src="./src/assets/35438e16c769f0813d6ae1d23c444b12-Eventbrite_Halloween_HomepageB_659x494.webp" />
                <button className="bg-[#d2633b] text-white py-2 px-4 rounded-sm absolute bottom-4 left-3 md:left-10" >Find your next event</button>
            </section>

            <section className="category-section flex items-center md:justify-around h-fit w-full overflow-scroll bg-slate-100 px-2 py-3 lg:py-6 gap-4" >
                {categoryDatabase.map((value, index) => {
                    return <CategoryButton key={index} category={value.name} src={value.imgUrl} />
                })}
            </section>

            <section className="content-section flex flex-col w-full px-4 sm:px-16">
                <div className="tabs-area flex items-center w-full py-3 overflow-scroll">
                    <ul className="flex flex-row h-fit w-fit gap-4" >
                        {tabsType.map((value, index) => {
                            return <Tabs key={index} text={value} class={activeTab === value.toLowerCase() ? "active" : ""}
                                onClick={() => {
                                    navigate(value.toLowerCase() === 'all' ? `` : `?filter=${value.toLowerCase()}`)
                                }} />
                        })}
                    </ul>
                </div>

                <div className="content-event-list flex flex-col py-2 gap-4">
                    <div className="flex flex-row items-center gap-4">
                        <h1 className="font-bold text-[26px]" >Popular in</h1>
                        <div className="search-input flex flex-row items-center gap-2">
                            <IoIosArrowDown className="text-[#d2633b]" fontSize={"24px"} />
                            <input type="text" className="border-b-[4px] text-[25px] w-[150px]" placeholder="Choose a location" defaultValue={"Surabaya"} />
                        </div>
                    </div>
                    {eventDatabase.length ? <div className="event-cards-section flex flex-col md:flex-row gap-6 md:gap-9 flex-wrap"> {eventDatabase.map((value, index) => {
                        return <EventCards key={index} src={value.img} onClick={() => navigate(`/e/${value.id}`)}
                            title={value.name}
                            startDate={value.startDate}
                            location={value.location ? `${value.location}, ${value.city}` : value.city}
                            price={value.ticketTypes[0] ? value.ticketTypes[0].price : "Free"} />
                    })} </div> : <Event404 />}
                    <button className="w-[50%] max-w-[300px] m-auto mt-2 border-[2.5px] rounded-[4px] border-slate-400 px-4 py-2">See more</button>
                </div>

            </section>
        </div>
    </LayoutPage>
}

export default LandingPage;
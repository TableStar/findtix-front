import { useNavigate, useParams } from "react-router-dom";
import LayoutPage from "../../components/LayoutPage"
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getEvents } from "../../redux/slice/eventSlice";
import Tabs from "../../components/Tabs";
import "./style.css"

const PromotorEventPage = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const databaseEvent = useSelector((state) => { return state.eventReducer.events })
    const totalEvents = useSelector((state) => { return state.eventReducer.totalEvents })

    const [activeTab, setActiveTab] = React.useState("Upcoming")

    useEffect(() => {
        dispatch(getEvents(`?creatorId=${params.id}&page=1&status=all`))
    }, [])

    return <LayoutPage>
        <div className="promotor-events-page w-full min-h-screen px-1 pb-2 pt-8 flex flex-col gap-4 items-center">
            <div className="promotor-events-page-header flex flex-col items-center w-[80%] gap-6">
                <h1 className="font-semibold text-2xl text-slate-900">{databaseEvent[0]?.auth.username}</h1>
                <div className="flex justify-around w-full">
                    <div className="w-[50%] flex flex-col items-center">
                        <p className="font-semibold text-lg">13.3K</p>
                        <span className="text-gray-600">Followers</span>
                    </div>
                    <div className="w-[50%] flex flex-col items-center border-l-[1px] border-slate-400">
                        <p className="font-semibold text-lg">{totalEvents}</p>
                        <span className="text-gray-600">Total events</span>
                    </div>
                </div>
                <button className="bg-[#3d64ff] text-white w-full py-2 rounded-md">Follow</button>
            </div>
            <section className="content-section w-[90%] pt-8 pb-2">
                <div className="tabs-area">
                    <ul className="flex flex-row h-fit w-fit gap-4 text-base" >
                        <Tabs text={"Upcoming"} class={activeTab === "Upcoming" ? "active" : ""}
                            onClick={() => { setActiveTab("Upcoming") }} />
                        <Tabs text={"Completed"} class={activeTab === "Completed" ? "active" : ""}
                            onClick={() => { setActiveTab("Completed") }} />
                        <Tabs text={"About"} class={activeTab === "About" ? "active" : ""}
                            onClick={() => { setActiveTab("About") }} />
                    </ul>
                </div>
                {activeTab === "About" ? "" :
                    <div className="py-4 h-fit">
                        <h1 className="font-semibold text-xl">{activeTab} events</h1>
                        <div className="event-list flex flex-col gap-4 pt-3">
                            {databaseEvent.map((value, index) => {
                                let date = new Date(value.startDate).toDateString().split(" ")
                                date[1] = `${date[1]} ${date[2]}`
                                date.splice(2, 1)
                                date = date.join(", ")
                                let time = value.startDate.split("T")[1].split(".")[0].split(":")
                                time = time[0] + ":" + time[1]
                                if (value.status === activeTab) {
                                    return <div key={index} className="promotor-event-page-cards w-full flex h-[125px] cursor-pointer"
                                        onClick={() => { activeTab === "Upcoming" ? navigate(`/e/${value.id}`) : "" }}>
                                        <div className="w-[30%] h-full">
                                            <img src={value.img} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="w-[70%] flex flex-col justify-between py-2 px-3">
                                            <h1 className="font-medium text-base">{value.name}</h1>
                                            <p className="text-[#cb3c09] text-sm">{date + ", " + time + " WIB"}</p>
                                            {value.ticketTypes.length > 1 ? <p className="text-sm font-medium">Start from {"Rp. " + value.ticketTypes[0].price.toLocaleString("id")}</p>
                                                : value.ticketTypes[0].price === 0 ? <p className="text-sm font-medium">Free</p>
                                                    : <p className="text-sm font-medium">{"Rp. " + value.ticketTypes[0].price.toLocaleString("id")}</p>}
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                    </div>}
            </section>
        </div>
    </LayoutPage>
}

export default PromotorEventPage;
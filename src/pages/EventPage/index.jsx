import { useParams } from "react-router-dom"
import LayoutPage from "../../components/LayoutPage"
import { BiHeart, BiShareAlt } from "react-icons/bi"
import { BsCalendarCheck, BsCameraVideo } from "react-icons/bs"
import { LuClock3 } from "react-icons/lu"
import { TfiTicket } from "react-icons/tfi"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { FaLocationDot } from "react-icons/fa6";
import "./style.css"
import React, { useEffect } from "react"
import axios from "axios"

const EventPage = () => {
    const params = useParams()
    const getEvent = async () => {
        const response = await axios.get(`http://localhost:2075/events/upcoming?id=${params.id}`)
        setDatabaseEvent(response.data)
    }
    const [databaseEvent, setDatabaseEvent] = React.useState([])
    console.log("🚀 ~ file: index.jsx:21 ~ EventPage ~ databaseEvent:", databaseEvent)
    const [eventTime, setEventTime] = React.useState({})
    const index = 0

    useEffect(() => {
        getEvent()
    }, [params])

    useEffect(() => {
        if (databaseEvent.length) {
            setEventTime({
                date: new Date(databaseEvent[0].startDate).toLocaleDateString("en-us", { weekday: "long", month: "long", year: "numeric", day: "numeric" }),
                startTime: new Date(databaseEvent[0].startDate).toLocaleTimeString("id").split("."),
                endTime: new Date(databaseEvent[0].endDate).toLocaleTimeString("id").split("."),
                eventDuration: (new Date(databaseEvent[0].endDate) - new Date(databaseEvent[0].startDate)) / 1000 / 60
            })
        }
    }, [databaseEvent])


    const [purchaseCount, setPurchaseCount] = React.useState(1)
    if (databaseEvent.length && eventTime.date) {
        const printTags = () => {
            return databaseEvent[0].tags.map((value, index) => <span key={index} className="bg-[#f4f2f8] text-gray-500 py-2 px-3 rounded-full">#{value}</span>)
        }

        return <LayoutPage>
            <div className="event-details-page">
                <div className="relative bg-gray-100 md:w-full md:h-[500px]">
                    <div className="event-background-image-container w-[90%] bg-white rounded-[25px] absolute left-0 right-0 m-auto top-10">
                        <div className={`event-image-container md:w-[100%] md:h-[500px] md:m-auto`} style={{ backgroundImage: `url(${databaseEvent[index].img})` }} >
                        </div>
                    </div>
                    <img src={databaseEvent[index].img} className="md:h-[500px] md:m-auto md:absolute md:left-0 md:right-0 md:top-10 object-cover" />
                </div>

                <div className="event-contents flex justify-between md:mt-[65px]">
                    <div className=" md:w-[60%] flex flex-col gap-6 p-6 lg:px-12">
                        <div className="event-headline relative flex flex-col gap-3">
                            <p className="lg:text-[20px] lg:font-medium" >{eventTime.date}</p>
                            <div className="absolute right-0 top-1 flex flex-row gap-4 text-[22px]">
                                <button><BiHeart /></button>
                                <button><BiShareAlt /></button>
                            </div>
                            <h1 className="text-[24px] lg:text-[48px] font-bold">{databaseEvent[index]?.name}</h1>
                            <p className="text-justify lg:text-[18px]">{databaseEvent[index]?.caption}</p>
                            <div className="bg-gray-100 w-full md:w-[75%] lg:w-[50%] flex flex-col gap-2 rounded-lg py-3 px-6 mt-3">
                                <p>By <span className="font-medium cursor-pointer">Creator</span></p>
                                <p className="text-[14px]">999 followers</p>
                                <button className="bg-blue-700 text-sm text-white rounded-md py-3" >Follow</button>
                            </div>
                        </div>

                        <div className="event-details flex flex-col gap-8">
                            <div className="event-date-time">
                                <h1 className="font-bold text-xl lg:text-[24px]">Date and time</h1>
                                <div className="flex flex-row items-center gap-4 mt-2 px-1">
                                    <BsCalendarCheck className="text-[20px] lg:text-[25px]" />
                                    <p className="font-medium text-[15px] lg:text-[17px]">{eventTime.date} · {eventTime.startTime[0]}:{eventTime.startTime[1]} - {eventTime.endTime[0]}:{eventTime.endTime[1]} WIB</p>
                                </div>
                            </div>

                            <div className="event-location">
                                <h1 className="font-bold text-xl lg:text-[24px]">Location</h1>
                                <div className="flex flex-row items-center gap-4 mt-2 px-1">
                                    {databaseEvent[index].city.name === "Online" ? <BsCameraVideo className="text-[20px] lg:text-[25px]" /> : <FaLocationDot className="text-[20px] lg:text-[25px]" />}
                                    <p className="font-medium text-[15px] lg:text-[17px]">{databaseEvent[index].city.name === "Online" ? "Online" : `${databaseEvent[0].location}, ${databaseEvent[0].city.name}`}</p>
                                </div>
                            </div>

                            <div className="event-about">
                                <h1 className="font-bold text-xl lg:text-[24px]">About this event</h1>
                                <div className="flex flex-col gap-6 mt-1">
                                    <div className="flex flex-row items-center gap-4 mt-2 px-1">
                                        <div className="text-[#3D64FF] bg-[#f4f2f8] p-2 rounded-md">
                                            <LuClock3 className="text-[20px] lg:text-[25px]" />
                                        </div>
                                        <p className="font-medium text-[15px] lg:text-[17px]">{
                                            eventTime.eventDuration < 60 ? `${eventTime.eventDuration} minutes` :
                                                eventTime.eventDuration === 60 ? `1 hour` :
                                                    eventTime.eventDuration % 60 === 0 ? `${eventTime.eventDuration / 60} hours` :
                                                        `${Math.floor(eventTime.eventDuration / 60) === 1 ? "1 hour" : `${Math.floor(eventTime.eventDuration / 60)} hours`} and ${eventTime.eventDuration % 60 === 1 ? "1 minute" : `${eventTime.eventDuration % 60} minutes`}`}</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-4 mt-2 px-1">
                                        <div className="text-[#3D64FF] bg-[#f4f2f8] p-2 rounded-md">
                                            <TfiTicket className="text-[22px] lg:text-[27px]" />
                                        </div>
                                        <p className="font-medium text-[15px] lg:text-[17px]">Mobile e-Ticket</p>
                                    </div>
                                    <p className="text-justify text-gray-500 lg:text-lg">{databaseEvent[index].description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="event-tags">
                            <h1 className="font-bold text-xl">Tags</h1>
                            <div className="flex flex-wrap gap-4 mt-4 text-xs lg:text-sm">
                                <span className="bg-[#f4f2f8] text-gray-500 py-2 px-3 rounded-full">{databaseEvent[index].category.name} Events</span>
                                {databaseEvent[0].tags ? printTags() : ""}
                            </div>
                        </div>
                    </div>

                    <div className="checkout-button flex flex-col justify-center w-full md:w-[400px] md:h-fit fixed md:sticky md:top-[80px] md:rounded-lg md:mt-[24px] md:mr-12 bottom-0 bg-white p-6 gap-4">
                        <div className="border-[2px] flex flex-col p-4 border-blue-700 rounded-md gap-6">
                            <div className="flex justify-between gap-8">
                                <span className="font-medium">{databaseEvent[index].ticketTypes[0].name}</span>
                                <div className="flex items-center gap-2">
                                    <button className={`p-1 rounded-md ${purchaseCount === 1 ? "bg-[#f4f2f8] text-gray-400" : "bg-blue-700 text-white"}`}
                                        onClick={() => setPurchaseCount(purchaseCount - 1)} disabled={purchaseCount === 1 ? true : false} ><AiOutlineMinus /></button>
                                    <span>{purchaseCount}</span>
                                    <button className="bg-blue-700 text-white p-1 rounded-md"
                                        onClick={() => setPurchaseCount(purchaseCount + 1)}><AiOutlinePlus /></button>
                                </div>
                            </div>
                            <span className="flex items-center gap-4">
                                {!databaseEvent[index].ticketTypes[0].price ? "Free" : `Rp. ${databaseEvent[index].ticketTypes[0].price.toLocaleString("id")}`}
                                <IoIosInformationCircleOutline className="text-[21px] text-blue-700" />
                            </span>
                        </div>
                        <button className="bg-[#d2633b] text-white text-md rounded-[4px] py-2">
                            Reserve a spot
                        </button>
                    </div>


                </div>
            </div>
        </LayoutPage>
    } else {
        return <h1>waiting</h1>
    }
}

export default EventPage;
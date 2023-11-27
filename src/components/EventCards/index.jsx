import { BiHeart, BiShareAlt } from "react-icons/bi"
import "./style.css"
import React from "react"
import { IoPersonOutline } from "react-icons/io5";

const EventCards = (props) => {
    let date = new Date(props.startDate).toDateString().split(" ")
    date[1] = `${date[1]} ${date[2]}`
    date.splice(2, 1)
    date = date.join(", ")
    let time = props.startDate.split("T")[1].split(".")[0].split(":")
    time = time[0] + ":" + time[1]
    return <div className="event-cards h-[400px] md:w-[290px] max-w-[400px] cursor-pointer" onClick={props.onClick}>
        <div className="relative h-[40%]">
            <img className="w-[100%] h-[100%] object-fill relative" src={props.src} />
            <button className="absolute flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:w-[50px] border rounded-full bg-white top-[185px] md:top-[130px] right-[55px] md:right-[70px]"><BiHeart className="text-[20px] md:text-[24px]" /></button>
            <button className="absolute flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:w-[50px] border rounded-full bg-white top-[185px] md:top-[130px] right-[10px]"><BiShareAlt className="text-[20px] md:text-[24px]" /></button>
        </div>
        <div className="flex flex-col justify-between h-[60%] gap-4 px-4 pt-3 pb-4">
            <div className="flex flex-col gap-1 min-h-[100px] mt-2">
                <h1 className="font-bold text-[16px] md:text-[20px] tracking-[0.2px]">{props.title}</h1>
                <p className="text-[#cb3c09] font-medium md:text-[15px]">{`${date} · ${time} WIB`}</p>
                <p className="text-gray-500 md:text-sm">{props.location === "Online" ? "Online Event" : `${props.location}`}</p>
                <p className="text-gray-500 md:text-sm">{props.price ? `Rp. ${props.price.toLocaleString("id")}` : "Free"}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm font-[450]">
                <p>By <span className="text-base font-medium text-blue-700">{props.username}</span></p>
                <p className="flex items-center gap-1"><IoPersonOutline className="text-lg" /> 123 followers</p>
            </div>
        </div>
    </div>
}

export default EventCards;
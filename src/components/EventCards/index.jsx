import { BiHeart, BiShareAlt } from "react-icons/bi"
import "./style.css"
import React from "react"

const EventCards = (props) => {
    let date = new Date(props.startDate).toDateString().split(" ")
    date[1] = `${date[1]} ${date[2]}`
    date.splice(2, 1)
    date = date.join(", ")
    let time = props.startDate.split("T")[1].split(".")[0].split(":")
    time = time[0] + ":" + time[1]
    return <div className="event-cards min-h-[250px] md:w-[290px] cursor-pointer" onClick={props.onClick}>
        <div className="relative mb-2">
            <img className="w-[100%] h-[200px] object-fill relative" src={props.src} />
            <button className="absolute flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:w-[50px] border rounded-full bg-white top-[185px] md:top-[176px] right-[55px] md:right-[70px]"><BiHeart className="text-[20px] md:text-[24px]" /></button>
            <button className="absolute flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:w-[50px] border rounded-full bg-white top-[185px] md:top-[176px] right-[10px]"><BiShareAlt className="text-[20px] md:text-[24px]" /></button>
        </div>

        <div className="flex flex-col gap-1 min-h-[100px]  px-4 py-4">
            <h1 className="font-bold text-[16px] md:text-[20px] tracking-[0.2px]">{props.title}</h1>
            <p className="text-[#cb3c09] font-medium md:text-[15px]">{`${date} · ${time} WIB`}</p>
            <p className="text-gray-500 md:text-sm">{props.location === "Online" ? "Online Event" : `${props.location}`}</p>
            <p className="text-gray-500 md:text-sm">{props.price ? `Rp. ${props.price.toLocaleString("id")}` : "Free"}</p>
        </div>
    </div>
}

export default EventCards;
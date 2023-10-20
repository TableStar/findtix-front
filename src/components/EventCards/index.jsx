import { BiHeart, BiShareAlt } from "react-icons/bi"
import "./style.css"

const EventCards = (props) => {
    let date = new Date(props.startDate).toDateString().split(" ")
    date[1] = `${date[1]} ${date[2]}`
    date.splice(2, 1)
    date = date.join(", ")

    let time = new Date(props.startDate).toLocaleTimeString("id").split(".")

    return <div className="event-cards min-h-[250px] sm:w-[22.5%]">
        <div className="relative mb-2">
            <img className="w-[100%] h-[200px] object-fill relative" src={props.src} />
            <button className="absolute flex justify-center items-center h-[35px] w-[35px] border rounded-full bg-white top-[163px] sm:top-[185px] right-[55px]"><BiHeart fontSize={"20px"} /></button>
            <button className="absolute flex justify-center items-center h-[35px] w-[35px] border rounded-full bg-white top-[185px] right-[10px]"><BiShareAlt fontSize={"20px"} /></button>
        </div>

        <div className="flex flex-col gap-1 min-h-[100px]  px-4 py-4">
            <h1 className="font-bold text-[16px] sm:text-[20px] tracking-[0.2px]">{props.title}</h1>
            <p className="text-[#cb3c09] font-medium md:text-sm">{`${date} ${time[0]}:${time[1]} WIB`}</p>
            <p className="text-gray-500 md:text-sm">{props.location === "Online" ? "Online Event" : `${props.location}`}</p>
            <p className="text-gray-500 md:text-sm">{props.price ? `Rp. ${props.price.toLocaleString("id")}` : "Free"}</p>
        </div>
    </div>
}

export default EventCards;
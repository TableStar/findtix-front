import { FaRegCalendarAlt } from "react-icons/fa";

const Event404 = () => {
    return <div className="flex flex-col items-center justify-center gap-6 h-[50vh]">
        <FaRegCalendarAlt fontSize={"48px"} />
        <div className="flex flex-col items-center gap-1">
            <h1 className="font-bold text-[20px]">No events in your area</h1>
            <p>Try a different location</p>
        </div>
    </div>
}

export default Event404;
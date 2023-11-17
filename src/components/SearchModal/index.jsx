import React from "react";
import { useEffect } from "react";
import "./style.css"
import { AiOutlineClose, AiOutlineSearch, AiOutlineArrowRight } from "react-icons/ai"
import { BiCurrentLocation } from "react-icons/bi"
const SearchModal = (props) => {
    const [searchVisible, setSearchVisible] = React.useState(false)
    const [position, setPosition] = React.useState("100vh")

    useEffect(() => {
        if (props.visible) {
            setSearchVisible(true)
            setTimeout(() => {
                setPosition("0")
            }, 100)
        } else {
            setPosition("100vh")
            setTimeout(() => {
                setSearchVisible(false)
            }, 1000)
        }
    }, [props.visible])

    const searchTypes = ["Online", "Free", "Today", "This weekend", "This month", "Music", "Health"]

    const printTags = () => {
        return searchTypes.map((value, index) => { return <span key={index} className="search-tags bg-[#f4f2f8] font-normal text-[16px] py-2 px-4 rounded-full cursor-pointer">{value}</span>})
    }

    return <div className="search-modal flex flex-col md:flex-row gap-4 w-screen h-screen bg-white pt-16 px-1"
        style={{ display: searchVisible ? "flex" : "none", top: position }}>
        <a className="search-modal-btn absolute top-1 right-1 text-[22px] p-[10px]" onClick={props.onClick} href="#"><AiOutlineClose /></a>
        <div className="search-modal-header flex flex-col w-[100%] md:w-[50%] px-6 gap-4">
            <div className="search-input flex flex-row max-w-[500px] gap-4 items-center">
                <AiOutlineSearch className="text-[32px]" />
                <input type="text" className="py-2 border-b-[4px] w-[80%] text-[25px]" placeholder="Search for anything" />
                <AiOutlineArrowRight className="text-[32px]" />
            </div>
            <div className="search-input flex flex-row gap-4 items-center">
                <BiCurrentLocation className="text-[32px]" />
                <input type="text" className="py-2 border-b-[4px] text-[25px] w-[150px]" placeholder="Choose a location" defaultValue={"Surabaya"} />
            </div>
            <div className="flex flex-row flex-wrap gap-4 pt-5">
                {printTags()}
            </div>
        </div>
        <div>
            <h1>ISINYA BAKAL ALL EVENTS</h1>
        </div>
    </div>
}

export default SearchModal;
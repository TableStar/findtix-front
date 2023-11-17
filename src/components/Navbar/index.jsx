import React from "react"
import "./style.css"
import { AiOutlineMenu } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowUp, IoIosHelpCircleOutline } from "react-icons/io"
import { BsCalendar, BsTicketPerforated } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom"
import SearchModal from "../SearchModal"
import { useSelector } from "react-redux";

const Navbar = (props) => {
    const [helpVisible, setHelpVisible] = React.useState(false)
    const [smMenu, setSmMenu] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(true)
    const userGlobal = useSelector((state) => state.accountSliceReducer);
    const navigate = useNavigate()
    // KALAU SUDAH LOGIN, NAVBAR KASIH PROFILE DAN NANTI NAVIGATE(/userdash)
    return (
        <section className="navbar flex flex-row justify-between items-center bg-white
        w-screen h-[50px] md:h-[70px] border-b-[1px] gap-4 text-sm md:text-base px-2 md:px-8 font-medium sticky top-0 z-10" >
            <SearchModal visible={props.visible} onClick={props.onClickClose} />
            <div className="flex flex-row items-center w-[50%] gap-2 md:gap-4">
                <p className="font-bold text-base md:text-2xl cursor-pointer" onClick={() => navigate("/")}>Find<span className="font-black text-[#d2633b]">TIX</span></p>
                <a className="bg-gray-100 w-[80%] max-w-[360px] font-normal text-gray-400 p-1 md:p-[10px] indent-1 border border-gray-300 rounded-[20px] cursor-pointer"
                    onClick={props.onClickOpen} href="#search">
                    Search Events
                </a>
            </div>
            {isLoggedIn ? <div className="navbar-btn cursor-pointer">
                <div className="p-3 relative" onClick={() => { setSmMenu(!smMenu) }}>
                    <VscAccount fontSize={"32px"} />
                    <div className="dropdown-content absolute bg-white w-[250px] text-base font-normal mt-[4px] right-0" style={{ display: smMenu ? "block" : "none" }}>
                        <div>My tickets</div>
                        <div>Create Events</div>
                        <div>Find Events</div>
                        <div>My account</div>
                        <div>Log out</div>
                    </div>
                </div>
            </div> :
                <div className="navbar-btn flex flex-row justify-between items-center w-[50%]">
                    <button className="hidden md:inline-block">Find Events</button>
                    <button className="hidden md:inline-block">Create Events</button>
                    <div className="hidden md:inline-block relative cursor-pointer p-0" style={{ backgroundColor: helpVisible ? "#f4f2f8" : "" }}>
                        <button className="flex flex-row items-center gap-1 py-[10px] px-[20px]" onClick={() => { setHelpVisible(!helpVisible) }}>
                            Help Center {helpVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                        <div className="dropdown-content absolute bg-white w-[250px] text-base font-normal mt-[1px] left-0" style={{ display: helpVisible ? "block" : "none" }}>
                            <div>Help Center</div>
                            <div>Find your tickets</div>
                            <div>Contact your event organizer</div>
                        </div>
                    </div>
                    <button className="px-2 py-4">Log In</button>
                    <button className="px-2 py-4">Sign Up</button>
                    <div className="md:hidden relative flex cursor-pointer p-0">
                        <button className="p-4" onClick={() => { setSmMenu(!smMenu) }}>
                            <AiOutlineMenu fontSize={"20px"} />
                        </button>
                        <div className="dropdown-content absolute bg-white w-[250px] right-[-7px] top-[50px] font-normal" style={{ display: smMenu ? "block" : "none" }}>
                            <div className="flex items-center gap-3">
                                <BsTicketPerforated fontSize={"18px"} />
                                Find Events
                            </div>
                            <div className="flex items-center gap-3">
                                <BsCalendar fontSize={"18px"} />
                                Create Events
                            </div>
                            <div className="p-0">
                                <button className="flex flex-row w-[100%] items-center gap-3 p-[15px]" onClick={() => { setHelpVisible(!helpVisible) }}>
                                    <BiHelpCircle fontSize={"20px"} />
                                    Help Center
                                    {helpVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </button>
                                <div className="dropdown-content absolute bg-white w-[250px] font-normal left-0" style={{ display: helpVisible ? "block" : "none" }}>
                                    <div className="py-[10px] px-[20px]">Help Center</div>
                                    <div className="py-[10px] px-[20px]">Find your tickets</div>
                                    <div className="py-[10px] px-[20px]">Contact your event organizer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </section>
    )
}

export default Navbar;
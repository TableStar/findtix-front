import React, { useEffect } from "react"
import "./style.css"
import { AiOutlineMenu } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowUp, IoMdHeartEmpty } from "react-icons/io"
import { IoTicketOutline, IoClose } from "react-icons/io5";
import { BsCalendar, BsTicketPerforated } from "react-icons/bs"
import { BiHelpCircle } from "react-icons/bi"
import { VscAccount } from "react-icons/vsc";

import { useLocation, useNavigate } from "react-router-dom"
import SearchModal from "../SearchModal"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/accountSlice"
import { getPic } from "../../redux/slice/picSlice";

const Navbar = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [helpVisible, setHelpVisible] = React.useState(false)
    const [smMenu, setSmMenu] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const userGlobal = useSelector((state) => { return state.accountSliceReducer });
    const profilePic = useSelector((state) => { return state.picSliceReducer.profilepic });

    useEffect(() => {
        if (userGlobal?.username) {
            dispatch(getPic());
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [userGlobal.username])
    console.log(userGlobal);
    // KALAU SUDAH LOGIN, NAVBAR KASIH PROFILE DAN NANTI NAVIGATE(/userdash)

    const handleClickCreateEvent = () => {
        navigate('/create')
    }

    return (
        <div className="navbar flex flex-row justify-between items-center bg-white
        w-screen h-[50px] md:h-[70px] border-b-[1px] gap-4 text-sm md:text-base px-2 md:px-8 font-medium sticky top-0 z-20" >
            <SearchModal visible={props.visible} selectedCity={props.selectedCity} onClick={props.onClickClose} />
            <div className="flex flex-row items-center w-[50%] gap-2 md:gap-4">
                <p className="font-bold text-2xl cursor-pointer" onClick={() => location.pathname === "/" ? "" : navigate("/")}>Find<span className="font-black text-[#d2633b]">TIX</span></p>
                {!location.pathname.includes("/userdash") ? <a className="bg-gray-100 min-w-[110px] w-[80%] max-w-[360px] font-normal text-gray-400 p-1 md:p-[10px] indent-1 border border-gray-300 rounded-[20px] cursor-pointer"
                    style={{ display: location.pathname.includes('/search') ? "none" : "block" }}
                    onClick={props.onClickOpen} href="#search">
                    Search Events
                </a> : ""}
            </div>
            {isLoggedIn ? <div className="navbar-btn cursor-pointer flex flex-row items-center gap-2 lg:gap-8">
                <p className="hidden lg:block text-gray-500 hover:text-black font-normal py-4 px-2"
                    onClick={() => { userGlobal.role === "creator" ? navigate("/create") : navigate("/search?page=1") }}>
                    {userGlobal.role === "creator" ? "Create events" : "Find events"}
                </p>
                <div className="hidden md:flex flex-col items-center w-[60px] py-2 text-gray-500 hover:text-black">
                    <IoMdHeartEmpty className="text-2xl text-black" />
                    <p className="text-sm font-normal ">Likes</p>
                </div>
                <div className="hidden md:flex flex-col items-center w-[60px] py-2 text-gray-500 hover:text-black">
                    <IoTicketOutline className="text-2xl text-black" />
                    <p className="text-sm font-normal">Tickets</p>
                </div>
                <div className="py-2 px-3 relative text-gray-500 hover:text-black" onClick={() => { setSmMenu(!smMenu) }}>
                    <div className="flex flex-row items-center gap-4">
                        {profilePic && !profilePic.includes("null") ? <img src={profilePic} className="h-[36px] w-[36px] rounded-full object-cover" /> : <VscAccount className="text-[28px] md:text-[32px] text-black" />}
                        <p className="font-normal">{userGlobal.username}</p>
                        {smMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                    <div className="dropdown-content absolute bg-white w-[250px] text-base font-normal mt-[5px] right-0" style={{ display: smMenu ? "block" : "none" }}>
                        <div className="lg:hidden" onClick={() => { userGlobal.role === "creator" ? navigate("/create") : navigate("/search?page=1") }}>
                            {userGlobal.role === "creator" ? "Create events" : "Find events"}
                        </div>
                        <div className="md:hidden">My tickets</div>
                        <div className="md:hidden">Liked</div>
                        <div>Following</div>
                        <div>Interests</div>
                        <div onClick={() => { navigate("/userdash") }}>My account</div>
                        <div onClick={() => {
                            dispatch(logout())
                            setIsLoggedIn(false)
                        }}>Log out</div>
                    </div>
                </div>
            </div> :
                // KALO BELUM LOGIN
                <div className="navbar-btn flex flex-row justify-between items-center w-[50%]">
                    {location.pathname.includes("/search") ? "" : <button className="hidden md:inline-block p-4" onClick={() => { navigate("/search?page=1") }}>
                        Find Events
                    </button>}
                    <button className="hidden md:inline-block p-4" onClick={handleClickCreateEvent} >Create Events</button>
                    <div className="hidden md:inline-block relative cursor-pointer p-0" style={{ backgroundColor: helpVisible ? "#f4f2f8" : "" }}>
                        <button className="flex flex-row items-center gap-1 py-4 px-[20px]" onClick={() => { setHelpVisible(!helpVisible) }}>
                            Help Center {helpVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                        <div className="dropdown-content absolute bg-white w-[250px] text-base font-normal mt-[1px] left-0" style={{ display: helpVisible ? "block" : "none" }}>
                            <div>Help Center</div>
                            <div>Find your tickets</div>
                            <div>Contact your event organizer</div>
                        </div>
                    </div>
                    <button className="p-4" onClick={() => { navigate(`/auth/login`) }}>Log In</button>
                    <button className="p-4" onClick={() => { navigate(`/auth/register`) }}>Sign Up</button>
                    <div className="md:hidden relative flex cursor-pointer p-0">
                        <button className="p-4" onClick={() => { setSmMenu(!smMenu) }}>
                            {smMenu ? <IoClose fontSize={"20px"} /> : <AiOutlineMenu fontSize={"20px"} />}
                        </button>
                        <div className="dropdown-content absolute bg-white w-[250px] right-[-7px] top-[50px] font-normal" style={{ display: smMenu ? "block" : "none" }}>
                            <div className="flex items-center gap-3"
                                onClick={() => { navigate("/search?page=1") }}>
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
        </div>
    )
}

export default Navbar;
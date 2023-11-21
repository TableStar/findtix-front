import React from "react";
import { useEffect } from "react";
import "./style.css"
import { AiOutlineClose, AiOutlineSearch, AiOutlineArrowRight } from "react-icons/ai"
import { BiCurrentLocation } from "react-icons/bi"
import { MdMyLocation, MdOutlineLiveTv } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../redux/slice/citySlice";
import { getSearchEvents } from "../../redux/slice/eventSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchModal = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchVisible, setSearchVisible] = React.useState(false)
    const [position, setPosition] = React.useState("100vh")

    const eventDatabase = useSelector((state) => { return state.eventReducer.searchEvents })
    const cities = useSelector((state) => { return state.cityReducer.cities })

    const [selectedCity, setSelectedCity] = React.useState(props.selectedCity)
    const inCity = React.useRef()
    const [showCities, setShowCities] = React.useState("none")
    useEffect(() => {
        setSelectedCity(props.selectedCity || "Surabaya")
        inCity.current.value = props.selectedCity || "Surabaya"
        dispatch(getSearchEvents(`?city=${props.selectedCity || "Surabaya"}`))
    }, [props.selectedCity])
    useEffect(() => {
        dispatch(getSearchEvents(`?city=${selectedCity}`))
    }, [selectedCity])

    const getLocation = async () => {
        const getCurrentPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error))
            })
        }
        try {
            const position = await getCurrentPosition()
            const options = {
                method: "GET",
                url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
                params: {
                    location: `${position.coords.latitude},${position.coords.longitude}`,
                    language: "en"
                },
                headers: {
                    "X-RapidAPI-Key": "6e2751ea05msh4e2a6982cd7d959p10e6b8jsn72525ae5f311",
                    "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com"
                }
            }
            const response = await axios.request(options)
            return response.data.results[0].area
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log("MASUK SINI");
        if (props.visible) {
            console.log("MASUK TRUE USE EFFECT");
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
        return searchTypes.map((value, index) => { return <span key={index} onClick={() => { alert(selectedCity) }} className="search-tags bg-[#f4f2f8] font-normal text-[16px] py-2 px-4 rounded-full cursor-pointer">{value}</span> })
    }
    return <div className="search-modal flex flex-col md:flex-row gap-8 w-screen min-h-screen bg-white pt-16 px-6 overflow-scroll"
        style={{ display: searchVisible ? "flex" : "none", top: position }}>
        <a className="search-modal-btn absolute top-1 right-1 text-[22px] p-[10px]" onClick={props.onClick} href="#">
            <AiOutlineClose /></a>
        <div className="search-modal-header flex flex-col w-[100%] md:w-[50%]  gap-4">
            <div className="search-input flex flex-row max-w-[500px] gap-4 items-center">
                <AiOutlineSearch className="text-[32px]" />
                <input type="text" className="py-2 border-b-[4px] w-[80%] text-[25px]" placeholder="Search for anything"
                    onChange={(e) => { dispatch(getSearchEvents(`?name=${e.target.value}&city=${selectedCity}`)) }} />
                <AiOutlineArrowRight className="text-[32px]" />
            </div>
            <div className="search-input relative">
                <div className="search-input flex flex-row items-center gap-4">
                    <BiCurrentLocation className="text-[32px]" />
                    <input type="text" ref={inCity} className="py-2 border-b-[4px] text-[25px] w-[200px]" placeholder={selectedCity} defaultValue={selectedCity}
                        onClick={() => {
                            inCity.current.value = "";
                            setShowCities("block")
                            dispatch(getCities())
                        }}
                        onChange={() => { dispatch(getCities(`?name=${inCity.current.value}`)) }} />
                </div>
                <div style={{ display: showCities }} className="search-input-btn city-result flex flex-col absolute z-10 bg-white text-[16px] font-normal w-[60vw] max-w-[350px]">
                    <div className="flex flex-row items-center gap-3 border-b-[1px] p-3 md:px-4 border-gray-300 cursor-pointer"
                        onClick={async () => {
                            setShowCities("none")
                            inCity.current.placeholder = "Loading..."
                            let city = await getLocation()
                            setSelectedCity(city)
                            inCity.current.value = city
                            inCity.current.placeholder = city
                        }}><MdMyLocation className="text-[22px]" /> Use my current location</div>
                    <div className="flex flex-row items-center gap-3 border-b-[1px] p-3 md:px-4 border-gray-300 cursor-pointer"
                        onClick={() => {
                            setShowCities("none")
                            setSelectedCity("Online events")
                            inCity.current.value = "Online events"
                        }}><MdOutlineLiveTv className="text-[22px]" /> Browse online events</div>
                    {cities.map((value, index) => {
                        return <p className="border-b-[1px] p-3 md:px-4 border-gray-300 cursor-pointer "
                            onClick={() => {
                                setShowCities("none")
                                setSelectedCity(value.name)
                                inCity.current.value = value.name
                            }} key={index}>{value.name}</p>
                    })}
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4 pt-5">
                {printTags()}
            </div>
        </div>
        <div>
            <h1 className="text-[22px] font-semibold">Upcoming events</h1>
            <div className="flex flex-col gap-8 mt-8 py-1 pb-4">
                {eventDatabase.map((value, index) => {
                    let date = new Date(value.startDate).toDateString().split(" ")
                    date[1] = `${date[1]} ${date[2]}`
                    date.splice(2, 1)
                    date = date.join(", ")
                    let time = value.startDate.split("T")[1].split(".")[0].split(":")
                    time = time[0] + ":" + time[1]
                    return <div key={index} onClick={() => {
                        setSearchVisible(false)
                        navigate(`/e/${value.id}`)
                    }} className="flex flex-row w-[100%] cursor-pointer">
                        <div className="flex flex-col gap-1 w-[50%]">
                            <h1 className="text-[20px]">{value.name}</h1>
                            <p className="text-[#cb3c09]">{date + ", " + time}</p>
                            <p className="text-gray-500 font-normal">{value.location ? value.location : "Online event"}</p>
                        </div>
                        <img src={value.img} className="w-[50%] h-[15vh] object-cover" />
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default SearchModal;
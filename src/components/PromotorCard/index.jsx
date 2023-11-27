import "./style.css"
const PromotorCard = (props) => {

    return <div className="promotor-card flex flex-col justify-between py-3 items-center w-[200px] h-[270px] rounded-md">
        <div className="w-[55%] cursor-pointer">
            <img src={props.img || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} className="cover" />
        </div>
        <div className="text-center text-lg cursor-pointer">
            <p className="font-semibold">{props.name}</p>
            <p className="text-base text-gray-500">{props.followers} followers</p>
        </div>
        <button className="bg-[#3d64ff] w-[75%] h-[20%] px-2 py-2 text-white rounded-md text-sm mt-10">Check {props.name}</button>
    </div>
}

export default PromotorCard;
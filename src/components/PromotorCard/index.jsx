import "./style.css"
const PromotorCard = (props) => {

    return <div className="promotor-card flex flex-col justify-between py-3 items-center min-w-[200px] h-[270px] rounded-md" onClick={props.onClick}>
        <div className="w-full flex flex-col items-center gap-2">
            <div className="w-[50%] h-[100px] cursor-pointer rounded-full">
                <img src={props.img || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} className="w-[100%] h-[100%] object-cover rounded-full" />
            </div>
            <div className="text-center text-lg cursor-pointer">
                <p className="font-semibold text-base">{props.name}</p>
                <p className="text-sm text-gray-500">{props.followers} followers</p>
            </div>
        </div>
        <button className="bg-[#3d64ff] w-[75%] h-[20%] px-2 py-2 text-white rounded-md text-sm">Check {props.name}</button>
    </div>
}

export default PromotorCard;
import "./style.css"
const CategoryButton = (props) => {

    return <div className="categoryButton flex flex-col items-center h-[135px] lg:min-h-[190px] w-[80px] lg:min-w-[125px] text-[10px] md:text-xs lg:text-base gap-1 lg:gap-4 cursor-pointer"
    onClick={props.onClick}>
        <div className="img-container inline-block h-[70px] lg:h-[115px] w-[70px] lg:w-[115px] rounded-full" >
            <img className="h-full w-auto object-cover rounded-[50%]" src={props.src} alt="Categories Image" />
        </div>
        <p className="text-center text-sm  md:text-base">{props.category}</p>
    </div>
}

export default CategoryButton;
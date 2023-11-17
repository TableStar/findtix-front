const CategoryButton = (props) => {

    return <div className="categoryButton flex flex-col items-center h-[120px] lg:h-[190px] w-[70px] lg:w-[125px] text-[10px] md:text-xs lg:text-base gap-1 lg:gap-4 cursor-pointer">
        <div className="img-container inline-block h-[70px] lg:h-[125px] w-[70px] lg:w-[125px] overflow-hidden rounded-full" >
            <img className="h-full w-auto object-cover" src={props.src} alt="Categories Image" />
        </div>
        <p className="text-center text-slate-600">{props.category}</p>
    </div>
}

export default CategoryButton;
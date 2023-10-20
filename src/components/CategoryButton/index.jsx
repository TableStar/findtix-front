const CategoryButton = (props) => {

    return <div className="categoryButton flex flex-col items-center h-[100px] lg:h-[175px] w-[70px] lg:w-[125px] text-[10px] md:text-xs lg:text-base gap-1 lg:gap-4">
        <div className="img-container inline-block h-[60px] lg:h-[105px] w-[60px] lg:w-[105px] overflow-hidden rounded-full" >
            <img className="h-full w-auto object-cover" src={props.src} alt="Categories Image" />
        </div>
        <p className="text-center text-slate-600">{props.category}</p>
    </div>
}

export default CategoryButton;
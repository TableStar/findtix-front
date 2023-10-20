const Tabs = (props) => {
    return <li className="">
        <button className={`py-2 w-fit ${props.class}`} onClick={props.onClick}>
            <span className="whitespace-nowrap">{props.text}</span>
        </button>
    </li>
}

export default Tabs;
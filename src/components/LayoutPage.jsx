import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const LayoutPage = (props) => {
    const location = useLocation()
    const [searchModalVisible, setSearchModalVisible] = React.useState(false)
    useEffect(() => {
        setSearchModalVisible(false)
    }, [location.pathname])
    return <div className={`page h-screen w-screen text-[#39364F] overflow-auto`}>
        <Navbar visible={searchModalVisible} selectedCity={props.selectedCity} onClickClose={() => { setSearchModalVisible(false) }}
            onClickOpen={() => { setSearchModalVisible(true) }} />
        {props.children}
        <Footer />
    </div>
}

export default LayoutPage;
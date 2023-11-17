import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutPage = (props) => {
    const [searchModalVisible, setSearchModalVisible] = React.useState(false)

    return <div className={`page h-screen w-screen text-[#39364F] overflow-auto`}>
        <Navbar visible={searchModalVisible} onClickClose={() => { setSearchModalVisible(false) }}
            onClickOpen={() => { setSearchModalVisible(true) }} />
        {props.children}
        <Footer />
    </div>
}

export default LayoutPage;
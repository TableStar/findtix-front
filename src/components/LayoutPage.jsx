import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutPage = (props) => {

    return <div className="page w-screen text-[#39364F]">
        <Navbar />
        {props.children}
        <Footer />
    </div>
}

export default LayoutPage;
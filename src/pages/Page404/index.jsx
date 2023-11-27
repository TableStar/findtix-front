import { useNavigate } from "react-router-dom";
import LayoutPage from "../../components/LayoutPage"
import { PiWarningCircle } from "react-icons/pi";

const Page404 = () => {
    const navigate = useNavigate()
    return <LayoutPage>
        <div className="w-full flex justify-center py-4">
            <div className="w-[80%] flex flex-col justify-center items-center gap-2">
                <PiWarningCircle className="text-[72px] md:text-[84px] text-yellow-400" />
                <h1 className="font-bold text-[40px] md:text-[54px] text-center">Whoops, the page or event you are looking for was not found.</h1>
                <p className="font-normal text-[27px] text-gray-500 text-center">If you feel this message is an error, please <a className="text-blue-500 cursor-pointer hover:underline" href="mailto:randomstuff.hans@gmail.com">let us know.</a></p>
                <div className="flex flex-col md:justify-center md:flex-row w-full gap-2 mt-4">
                    <button className="w-full md:w-[20vw] bg-[#d2633b] text-white py-2 px-4 rounded-md hover:opacity-90 transition ease duration-300">Create an Event</button>
                    <button className="w-full md:w-[20vw] border-[3px] py-2 px-4 rounded-md hover:border-gray-500 hover:bg-gray-100 transition ease duration-300"
                        onClick={() => { navigate('/search?page=1') }}
                    >Find an Event</button>
                </div>
            </div>
        </div>
    </LayoutPage>
}

export default Page404;
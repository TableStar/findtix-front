import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [helpVisible, setHelpVisible] = React.useState(false);
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  //   const [name, setName] = useState("");
  console.log(userGlobal.username);
  //   useEffect(() => {
  //     if (userGlobal.username) {
  //       setName(userGlobal.username);
  //     }
  //   }, [userGlobal.username]);
  return (
    <section
      className="navbar flex flex-row justify-between items-center bg-white
        w-screen h-[50px] md:h-[70px] border-b-[1px] gap-4 text-sm md:text-base px-2 md:px-8 font-medium sticky top-0 z-10"
    >
      <div className="flex flex-row items-center w-[50%] gap-2 md:gap-4">
        <p className="font-bold text-base md:text-2xl">
          Find<span className="font-black text-[#d2633b]">TIX</span>
        </p>
        {userGlobal.username ? <p>Hello,{userGlobal.username}</p> : ""}
        <input
          className="bg-gray-100 w-[80%] max-w-[360px] overflow-hidden py-1 px-1 border rounded-[20px]"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="navbar-btn flex flex-row justify-between items-center w-[50%]">
        <button className="hidden md:inline-block">Find Events</button>
        <button className="hidden md:inline-block">Create Events</button>
        <div
          className="hidden md:inline-block relative cursor-pointer p-0"
          style={{ backgroundColor: helpVisible ? "#f4f2f8" : "" }}
        >
          <button
            className="flex flex-row items-center gap-1 py-[10px] px-[20px]"
            onClick={() => {
              setHelpVisible(!helpVisible);
            }}
          >
            Help Center {helpVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          <div
            className="help-content absolute bg-white w-[250px] text-base font-normal mt-1 left-0"
            style={{ display: helpVisible ? "block" : "none" }}
          >
            <div>Help Center</div>
            <div>Find your tickets</div>
            <div>Contact your event organizer</div>
          </div>
        </div>
        <button>Log In</button>
        <button>Sign Up</button>
        <div className="md:hidden flex cursor-pointer">
          <button>
            <AiOutlineMenu fontSize={"20px"} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

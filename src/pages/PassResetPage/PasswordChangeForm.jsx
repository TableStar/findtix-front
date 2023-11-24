import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputBoxForm from "../../components/InputBoxForm";
import { API_URL } from "../../helper";
import { userLoaded } from "../../redux/slice/accountSlice";
import ModalForResetPass from "../../components/ModalForResetPass";
import ModalForLoading from "../../components/ModalForLoading";
import { Dialog } from "@headlessui/react";
import PassForm from "../../components/PassForm";

const PasswordChangeForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToken = urlParams.get("token");
  console.log(paramsToken);
  useEffect(() => {
    if (!paramsToken?.length > 0) {
      navigate("/");
    }
  });
  return (
    <div className=" flex justify-center items-center content-center w-screen h-screen ">
      <div className=" flex flex-col justify-center items-center h-full w-full ">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
            Edit Your Password
          </h2>
        </div>
        <PassForm />
      </div>
    </div>
  );
};

export default PasswordChangeForm;

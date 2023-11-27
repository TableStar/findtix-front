import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "../../helper";
import { keepLogin, userLoaded } from "../../redux/slice/accountSlice";
import ModalForResetPass from "../ModalForResetPass";
import ModalForLoading from "../ModalForLoading";
import { Dialog } from "@headlessui/react";
import InputBoxForm from "../InputBoxForm";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";

const ChangeUsernameForm = (props) => {
  const [inUsername, setInUsername] = useState("");
  console.log(
    "🚀 ~ file: index.jsx:16 ~ ChangeUsernameForm ~ inUsername:",
    inUsername
  );
  const [inEmail, setInEmail] = useState("");
  const [inPassword, setInPassword] = useState("");
  console.log(
    "🚀 ~ file: index.jsx:19 ~ ChangeUsernameForm ~ inPassword:",
    inPassword
  );
  const [isOpenForgot, setIsOpenForgot] = useState(false);
  const [isOpenLoad, setIsOpenLoad] = useState(false);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = async () => {
    try {
      setIsOpenLoad(true);
      const response = await axios.post(API_URL + `/auths/login`, {
        username: inUsername,
        password: inPassword,
      });
      console.log("check user", response.data.result.token);
      if (response.data.result.token) {
        localStorage.setItem("token", response.data.result.token);
        dispatch(userLoaded(response.data.result));
      }
      setIsOpenLoad(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  const onSubmitChangeAuth = async () => {
    try {
      setIsOpenLoad(true);
      const response = await axiosInstance.patch(API_URL + "/auths/editauths", {
        username: inUsername,
        email: inEmail,
        password: inPassword,
      });
      console.log(
        "🚀 ~ file: index.jsx:45 ~ onSubmitChangeAuth ~ response:",
        response
      );
      dispatch(keepLogin());
      setIsOpenLoad(false);
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  useEffect(() => {
    if (userGlobal.username?.length > 0) {
      setTimeout(() => {
        setInUsername(userGlobal?.username);
        setInEmail(userGlobal?.email);
      }, 200);
    }
  }, [userGlobal.username]);
  return (
    <form
      className={"bg-white  rounded-md max-h-fit w-10/12 px-8 pt-6 pb-8 mb-4 "}
    >
      <div className="mb-5">
        <InputBoxForm
          htmlName="name"
          placeholderText="Your Username"
          focusState={focusUsername}
          setFocusState={setFocusUsername}
          labelState={inUsername}
          onChanger={(e) => setInUsername(e.target.value)}
          names="name"
          inputType="text"
          className="lg:w-80"
          defaultValue={userGlobal?.username}
        />
      </div>
      {userGlobal.username?.length > 0 ? (
        <div className="mb-6">
          <InputBoxForm
            htmlName="email"
            placeholderText="Email Address"
            focusState={focusEmail}
            setFocusState={setFocusEmail}
            labelState={inEmail}
            onChanger={(e) => {
              setInEmail(e.target.value);
            }}
            names="email"
            inputType="email"
            lgWidth="w-80"
            defaultValue={userGlobal?.email}
          />
        </div>
      ) : (
        ""
      )}
      <div className="mb-6">
        <InputBoxForm
          htmlName="password"
          placeholderText="Your Password"
          focusState={focusPassword}
          setFocusState={setFocusPassword}
          labelState={inPassword}
          onChanger={(e) => setInPassword(e.target.value)}
          names="password"
          inputType="password"
          className={` lg:w-80 ${
            inPassword.length <= 7 && inPassword.length > 0
              ? `border-2 border-red-500 `
              : ``
          }`}
        />
        {focusPassword && inPassword.length <= 0 ? (
          <p className="text-red-500 text-xs italic">
            Please enter a password.
          </p>
        ) : (
          <div className=" h-4"></div>
        )}
      </div>
      {userGlobal.username?.length > 0 ? (
        <div className="flex flex-col gap-y-2 justify-between">
          <button
            className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              onSubmitChangeAuth();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 justify-between">
          <button
            className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={() => {
              setIsOpenForgot(!isOpenForgot);
            }}
          >
            Forgot Password?
          </a>
        </div>
      )}
      <Dialog
        open={isOpenLoad}
        onClose={() => setIsOpenLoad(false)}
        className="relative z-40"
      >
        <ModalForLoading />
      </Dialog>
      <Dialog
        open={isOpenForgot}
        onClose={() => setIsOpenForgot(false)}
        className="relative z-20"
      >
        <ModalForResetPass onClickforX={() => setIsOpenForgot(!isOpenForgot)} />
      </Dialog>
    </form>
  );
};

export default ChangeUsernameForm;

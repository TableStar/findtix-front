import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputBoxForm from "../../components/InputBoxForm";
import { API_URL } from "../../helper";
import ModalForLoading from "../../components/ModalForLoading";
import { Dialog } from "@headlessui/react";
import { axiosInstance } from "../../config/axios";

const PassForm = () => {
  const [inOldPass, setInOldPass] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inPasswordConfirm, setInPasswordConfirm] = useState("");
  const [focusOldPass, setFocusOldPass] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [isOpenLoad, setIsOpenLoad] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToken = urlParams.get("token");
  const resetForm = (ev) => {
    ev.preventDefault();
    setInOldPass("");
    setInPassword("");
    setInPasswordConfirm("");
  };
  const onClickSubmitPass = async () => {
    try {
      setIsOpenLoad(true);
      if (paramsToken) {
        const response = await axios.post(
          API_URL + "/forgotten/resetpass",
          {
            password: inPassword,
            passwordConfirm: inPasswordConfirm,
          },
          { headers: { Authorization: `Bearer ${paramsToken}` } }
        );
        console.log(
          "🚀 ~ file: index.jsx:35 ~ onClickSubmitPass ~ response:",
          response
        );
        setIsOpenLoad(false);
        navigate("/auth/login");
      } else {
        const response = await axiosInstance.post(
          API_URL + "/forgotten/resetpass",
          {
            oldPassword: inOldPass,
            password: inPassword,
            passwordConfirm: inPasswordConfirm,
          }
        );
        console.log(
          "🚀 ~ file: PasswordChangeForm.jsx:36 ~ onClickSubmitPass ~ response:",
          response
        );
        setIsOpenLoad(false);
        setInOldPass("");
        setInPassword("");
        setInPasswordConfirm("");
      }
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  return (
    <form className={"bg-white  rounded-md max-h-fit px-8 py-8 "}>
      {!paramsToken ? (
        <div className="mb-2">
          <InputBoxForm
            htmlName="Old Password"
            placeholderText="Old Password"
            focusState={focusOldPass}
            setFocusState={setFocusOldPass}
            labelState={inOldPass}
            onChanger={(e) => setInOldPass(e.target.value)}
            names="old password"
            inputType="text"
            className="lg:w-80"
          />
          {focusOldPass && inOldPass.length <= 0 ? (
            <p className="text-red-500 text-xs italic">
              Please enter your old password.
            </p>
          ) : (
            <div className=" h-4"></div>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="mb-2">
        <InputBoxForm
          htmlName="password"
          placeholderText="New Password"
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
            Please enter your new password.
          </p>
        ) : (
          <div className=" h-4"></div>
        )}
      </div>
      <div className="mb-2">
        <InputBoxForm
          htmlName="confirmPassword"
          placeholderText="Confirm Password"
          focusState={focusConfirmPassword}
          setFocusState={setFocusConfirmPassword}
          labelState={inPasswordConfirm}
          onChanger={(e) => setInPasswordConfirm(e.target.value)}
          names="confirmPassword"
          inputType="password"
          className={` lg:w-80 ${
            inPassword !== inPasswordConfirm && inPassword.length >= 1
              ? `border-2 border-red-500 `
              : ``
          }`}
        />
        {inPassword.length >= 1 && inPassword !== inPasswordConfirm ? (
          <p className="text-red-500 text-xs italic">Passwords do not MATCH.</p>
        ) : (
          <div className=" h-4"></div>
        )}
      </div>
      <div className="flex flex-col gap-y-2 justify-between">
        <button
          className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            onClickSubmitPass();
          }}
        >
          Submit
        </button>
      </div>
      <Dialog
        open={isOpenLoad}
        onClose={() => setIsOpenLoad(false)}
        className="relative z-40"
      >
        <ModalForLoading />
      </Dialog>
    </form>
  );
};

export default PassForm;
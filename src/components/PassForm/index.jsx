import { forwardRef, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputBoxForm from "../../components/InputBoxForm";
import { API_URL } from "../../helper";
import ModalForLoading from "../../components/ModalForLoading";
import { Dialog } from "@headlessui/react";
import { axiosInstance } from "../../config/axios";
import Toast from "../Toast/Toast";

const PassForm = (props) => {
  const [inOldPass, setInOldPass] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inPasswordConfirm, setInPasswordConfirm] = useState("");
  const [focusOldPass, setFocusOldPass] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [isOpenLoad, setIsOpenLoad] = useState(false);
  const [openToastSuccessUp, setOpenToastSuccessUp] = useState(false);
  const [toastBody, setToastBody] = useState("");
  const refOld = useRef(null);
  const refPass = useRef(null);
  const refConf = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToken = urlParams.get("token");
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
        console.log("heres");
        const response = await axiosInstance.patch(
          API_URL + "/auths/changepass",
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
        refOld.current.value = null;
        refPass.current.value = null;
        refConf.current.value = null;
        setInOldPass("");
        setInPassword("");
        setInPasswordConfirm("");
        setIsOpenLoad(false);
      }
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
      alert("error changing password")
    }
  };
  return (
    <form className={"bg-white  rounded-md max-h-fit px-8 py-8 "}>
      {!paramsToken ? (
        <div className="mb-2">
          <InputBoxForm
            innerRef={refOld}
            htmlName="Old Password"
            placeholderText="Old Password"
            focusState={focusOldPass}
            setFocusState={setFocusOldPass}
            labelState={inOldPass}
            onChanger={(e) => setInOldPass(e.target.value)}
            names="old password"
            inputType="password"
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
          innerRef={refPass}
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
          innerRef={refConf}
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
          onClick={(ev) => {
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
      <Toast
        type="success"
        open={openToastSuccessUp}
        setOpen={setOpenToastSuccessUp}
        right="10px"
        top="110px"
        head="Success"
        body="Picture successfully uploaded"
      />
    </form>
  );
};

export default PassForm;

import { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputBoxForm from "../../components/InputBoxForm";
//import { hasRegisterAction } from "../redux/action/hasRegisterAction";
import { Dialog } from "@headlessui/react";
import ModalForRegister from "../../components/ModalForRegister";
import { API_URL } from "../../helper";
import { GoAlertFill } from "react-icons/go";
import ModalForLoading from "../../components/ModalForLoading";
import ModalForResetPass from "../../components/ModalForResetPass";

const LandingPageRegister = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [inFirstName, setInFirstName] = useState("");
  const [inLastName, setInLastName] = useState("");
  const [inPasswordConfirm, setInPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  // const hasRegisterGlobal = useSelector((state) => state.hasRegisterReducer);
  const [existingUsername, setExistingUsername] = useState(false);
  const [existingEmail, setExistingEmail] = useState(false);
  const navigate = useNavigate();
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLoad, setIsOpenLoad] = useState(false);

  const saveRegister = async (selectedRole) => {
    if (inUsername && inEmail && inPassword && inFirstName && inLastName) {
      try {
        setIsOpenLoad(true);
        const response = await axios.post(API_URL + `/auths/register`, {
          username: inUsername,
          email: inEmail,
          password: inPassword,
          passwordConfirm: inPasswordConfirm,
          firstName: inFirstName,
          lastName: inLastName,
          role: selectedRole,
        });
        console.log(response);
        if (response.data.result.token) {
          localStorage.setItem("token", response.data.result.token);
        }
        setIsOpenLoad(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        setIsOpenLoad(false);
        alert(error.response.data.message);
      }
    } else {
      return alert("Please fill all information");
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className=" hidden relative  h-16 lg:block lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://assetsio.reedpopcdn.com/yu-gi-oh-tcg-european-championships-2023-crowd.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"
            className="absolute inset-0 h-screen w-full object-cover overflow-hidden"
          />
        </aside>
        <main className="flex items-center justify-center px-4 py-4 sm:px-6 lg:col-span-7 lg:px-8 lg:py-6 xl:col-span-6">
          <div className="flex flex-col items-center lg:items-baseline h-full w-full  ">
            <div className=" ps-8">
              <p
                className=" font-bold text-base md:text-2xl cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Find<span className="font-black text-[#d2633b]">TIX</span>
              </p>
              <h2 className=" text-xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
                Create An Account
              </h2>
            </div>
            <form className="bg-white justify-center items-center  rounded-md max-h-fit w-96 px-8 pt-6 pb-8 mb-2 ">
              <div className="pb-2 mb-2 md:pb-0 flex flex-col">
                <InputBoxForm
                  htmlName="name"
                  placeholderText="Your Username"
                  focusState={focusUsername}
                  setFocusState={setFocusUsername}
                  labelState={inUsername}
                  onChanger={(e) => {
                    setInUsername(e.target.value);
                  }}
                  names="name"
                  inputType="text"
                  className={`lg:w-80`}
                />
                {existingUsername ? (
                  <p className="text-red-500 text-xs italic">
                    This username has been used.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="mb-2">
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
                />
                {existingEmail ? (
                  <p className="text-red-500 text-xs italic">
                    This email has been used.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="flex mb-6 gap-4 lg:gap-8">
                <div className="flex flex-col">
                  <InputBoxForm
                    htmlName="first name"
                    placeholderText="First Name"
                    focusState={focusFirstName}
                    setFocusState={setFocusFirstName}
                    labelState={inFirstName}
                    onChanger={(e) => setInFirstName(e.target.value)}
                    names="first name"
                    inputType="text"
                    lgWidth="w-36"
                  />
                </div>
                <div className="flex  flex-col">
                  <InputBoxForm
                    htmlName="last name"
                    placeholderText="Last Name"
                    focusState={focusLastName}
                    setFocusState={setFocusLastName}
                    labelState={inLastName}
                    onChanger={(e) => setInLastName(e.target.value)}
                    names="last name"
                    inputType="text"
                    lgWidth="w-36"
                  />
                </div>
              </div>
              <div className="mb-2">
                <InputBoxForm
                  htmlName="password"
                  placeholderText="Password"
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
                {inPassword.length <= 7 && inPassword.length >= 1 ? (
                  <p className="text-red-500 text-xs italic">
                    Please enter at least 8 characters
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
                  <p className="text-red-500 text-xs italic">
                    Passwords do not MATCH.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="flex items-center justify-center content-center">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Create an account
                </button>
                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-30"
                >
                  <ModalForRegister
                    onClickforX={() => setIsOpen(false)}
                    onClickForAttendee={() => {
                      saveRegister("attendee");
                    }}
                    onClickForCreator={() => {
                      saveRegister("creator");
                    }}
                  />
                </Dialog>
                <Dialog
                  open={isOpenLoad}
                  onClose={() => setIsOpenLoad(true)}
                  className="relative z-40"
                >
                  <ModalForLoading />
                </Dialog>
              </div>
            </form>
            <div className=" max-w-sm mx-auto text-center mb-2">
              <p className=" text-black text-sm">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="font-bold text-orange-500 hover:underline"
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LandingPageRegister;

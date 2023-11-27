import { useEffect, useState } from "react";
import InputBoxForm from "../../components/InputBoxForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUserProps } from "../../redux/slice/userSlice";
import { axiosInstance } from "../../config/axios";
import { API_URL } from "../../helper";
import { BsPersonFill } from "react-icons/bs";
import axios from "axios";
import { getPic, setProfilePic } from "../../redux/slice/picSlice";
import { FaTrashCan } from "react-icons/fa6";
import { keepLogin } from "../../redux/slice/accountSlice";
import Navbar from "../../components/Navbar";
import Toast from "../../components/Toast/Toast";
import { Dialog } from "@headlessui/react";
import ModalForLoading from "../../components/ModalForLoading";
import PassForm from "../../components/PassForm";
import ChangeUsernameForm from "../../components/UsernameAndPassForm";
import ReferralSection from "../../components/ReferralSection";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";

const UserDash = () => {
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const userPropsGlobal = useSelector(
    (state) => state.userSliceReducer.userProps
  );

  const profilePicGlobal = useSelector(
    (state) => state.picSliceReducer.profilepic
  );
  const [inFirstName, setInFirstName] = useState(``);
  const [inLastName, setInLastName] = useState(``);
  const [inPhone, setInPhone] = useState(``);
  const [inCompany, setInCompany] = useState(``);
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusCompany, setFocusCompany] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openToastSuccessUp, setOpenToastSuccessUp] = useState(false);
  const [toastBodies, setToastBodies] = useState("");
  const [isOpenLoad, setIsOpenLoad] = useState(false);
  const [menu, setMenu] = useState(0);
  const dispatch = useDispatch();

  const profilePhotoSave = async (event) => {
    try {
      event.preventDefault();
      if (event.target.files[0]) {
        setIsOpenLoad(true);
        const formData = new FormData();
        formData.append("picture", event.target.files[0]);
        console.log(
          "🚀 ~ file: UserDash.jsx:58 ~ profilePhotoSave ~ formData:",
          formData.get("picture")
        );
        const response = await axios.patch(API_URL + "/profilepic", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(
          "🚀 ~ file: UserDash.jsx:43 ~ profilePhotoSave ~ response:",
          response
        );
        dispatch(setProfilePic(API_URL + `${response.data.result}`));
        setIsOpenLoad(false);
        setToastBodies(
          response.data.message[0].toUpperCase() +
            response.data.message.slice(1)
        );
        setOpenToastSuccessUp(true);
      }
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  const profilePhotoDelete = async () => {
    try {
      setIsOpenLoad(true);
      const response = await axiosInstance.delete(API_URL + "/profilepic");
      console.log(
        "🚀 ~ file: UserDash.jsx:55 ~ profilePhotoDelete ~ response:",
        response
      );
      dispatch(setProfilePic(""));
      setIsOpenLoad(false);
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  const onEditSave = async () => {
    try {
      setIsOpenLoad(true);
      const response = await axiosInstance.patch(
        API_URL + `/auths/edituserprops`,
        {
          firstName: inFirstName,
          lastName: inLastName,
          phoneNumber: inPhone,
          creatorCompany: inCompany,
        }
      );
      dispatch(getUserProps());
      setIsOpenLoad(false);
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  console.log(
    "🚀 ~ file: UserDash.jsx:19 ~ UserDash ~ userPropsGlobal:",
    userPropsGlobal
  );
  useEffect(() => {
    dispatch(keepLogin());
    if (!userGlobal?.token) {
      navigate("/auth/login");
    }
    dispatch(getPic());
    dispatch(getUserProps());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setInFirstName(userPropsGlobal?.firstName);
      setInLastName(userPropsGlobal?.lastName);
      setInPhone(userPropsGlobal?.phoneNumber);
      setInCompany(userPropsGlobal?.creatorCompany);
    }, 300);
  }, [userPropsGlobal]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [menu]);
  useEffect(() => {
    if (openToastSuccessUp) {
      setTimeout(() => {
        setOpenToastSuccessUp(false);
      }, 2800);
    }
  }, [openToastSuccessUp]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <div className="fixed flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 w-full h-screen max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
            <button
              type="button"
              tabIndex="0"
              onClick={() => {
                setMenu(0);
              }}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <IoPersonCircleSharp size={`25px`} />
              Profile Information
            </button>
            <button
              type="button"
              tabIndex="0"
              onClick={() => {
                setMenu(1);
              }}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <MdOutlineAlternateEmail size={`25px`} />
              Change Username and Email
            </button>
            <button
              type="button"
              tabIndex="0"
              onClick={() => {
                setMenu(2);
              }}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <RiGitRepositoryPrivateFill size={`25px`} />
              Password
            </button>
            <button
              type="button"
              tabIndex="0"
              onClick={() => {
                setMenu(3);
              }}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all gap-x-1 hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <FaHandshake size={`25px`} />
              Referral
            </button>
          </nav>
        </div>
        <div className=" flex w-full h-screen max-w-[20rem] p-4"></div>
        {menu == 0 ? (
          <div className=" px-4">
            <div className="flex flex-row-reverse py-3 w-full mx-auto">
              <p className="text-sm">
                FindTix account since{" "}
                {new Date(
                  userPropsGlobal.createdAt.split("T")[0]
                ).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Profile Photo</h1>
              </div>
              <div>
                <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
              </div>
              <div className=" w-48">
                <div className=" flex justify-center content-center items-center h-48 w-48 border-2 border-slate-300">
                  <form>
                    <label
                      htmlFor="picUpload"
                      className=" focus:outline-1"
                      onSubmit={profilePhotoSave}
                    >
                      {profilePicGlobal &&
                      !profilePicGlobal.includes("null") ? (
                        <div className="h-44 w-44 cursor-pointer">
                          <img
                            src={profilePicGlobal}
                            className="w-full h-full object-contain"
                          />
                          <input
                            id="picUpload"
                            name="picUpload"
                            onChange={(e) => profilePhotoSave(e)}
                            type="file"
                            accept="image/*"
                            className=" opacity-0 -z-10 absolute"
                          />
                        </div>
                      ) : (
                        <div className=" flex flex-col items-center h-44 w-44 border border-dashed border-slate-300 cursor-pointer">
                          <BsPersonFill size={"100px"} />
                          <p>
                            ADD A PROFILE
                            <span className=" flex justify-center">IMAGE</span>
                          </p>
                          <p className=" text-xs">click to upload photo</p>
                          <input
                            id="picUpload"
                            name="picUpload"
                            onChange={(e) => profilePhotoSave(e)}
                            type="file"
                            accept="image/*"
                            className=" opacity-0 -z-10 absolute"
                          />
                        </div>
                      )}
                    </label>
                  </form>
                </div>
                <div className="flex gap-x-3 justify-between my-1">
                  <p className=" text-xs">Click picture to change</p>
                  <a
                    className=" text-xs flex text-blue-600 hover:cursor-pointer hover:underline"
                    onClick={profilePhotoDelete}
                  >
                    <FaTrashCan /> Remove
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Account Information</h1>
            </div>
            <div>
              <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
            </div>
            <form
              className={
                "bg-white  rounded-md max-h-fit w-10/12 px-8 pt-6 pb-8 mb-4 "
              }
            >
              <div className=" flex gap-x-8">
                <div className="mb-6">
                  <InputBoxForm
                    htmlName="first name"
                    placeholderText="First Name"
                    focusState={focusFirstName}
                    setFocusState={setFocusFirstName}
                    labelState={inFirstName}
                    onChanger={(e) => setInFirstName(e.target.value)}
                    names="first name"
                    inputType="text"
                    className={` lg:w-80`}
                    defaultValue={userPropsGlobal?.firstName}
                  />
                </div>
                <div className="mb-6">
                  <InputBoxForm
                    htmlName="last name"
                    placeholderText="Last Name"
                    focusState={focusLastName}
                    setFocusState={setFocusLastName}
                    labelState={inLastName}
                    onChanger={(e) => setInLastName(e.target.value)}
                    names="last name"
                    inputType="text"
                    className={` lg:w-80`}
                    defaultValue={userPropsGlobal?.lastName}
                  />
                </div>
              </div>
              <div className=" flex gap-x-8">
                <div className="mb-6">
                  <InputBoxForm
                    htmlName="phone number"
                    placeholderText="Phone Number"
                    focusState={focusPhone}
                    setFocusState={setFocusPhone}
                    labelState={inPhone}
                    onChanger={(e) => setInPhone(e.target.value)}
                    names="phone number"
                    inputType="tel"
                    className={` lg:w-80`}
                    defaultValue={userPropsGlobal?.phoneNumber}
                  />
                </div>
                {userGlobal.role === "creator" ? (
                  <div className="mb-6">
                    <InputBoxForm
                      htmlName="creator company"
                      placeholderText="Your Company"
                      focusState={focusCompany}
                      setFocusState={setFocusCompany}
                      labelState={inCompany}
                      onChanger={(e) => setInCompany(e.target.value)}
                      names="last name"
                      inputType="text"
                      className={` lg:w-80`}
                      defaultValue={userPropsGlobal.creatorCompany}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex flex-col gap-y-2 justify-between">
                <button
                  className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    onEditSave();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
        {menu == 1 ? (
          <div className=" px-4">
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Your Username and Email</h1>
              </div>
              <div>
                <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
              </div>
              <div className="flex justify-between">
                <h6 className="text-base font-bold">
                  Edit your Username and Email
                </h6>
              </div>
              <ChangeUsernameForm />
            </div>
            <div></div>
          </div>
        ) : (
          ""
        )}
        {menu == 2 ? (
          <div className=" px-4">
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Your Password</h1>
              </div>
              <div>
                <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
              </div>
              <div className="flex justify-between">
                <h6 className="text-base font-bold">Set a new password</h6>
              </div>
              <PassForm menu={menu} setMenu={setMenu} />
            </div>
            <div></div>
          </div>
        ) : (
          ""
        )}
        {menu == 3 ? <ReferralSection /> : ""}
      </div>
      <Dialog
        open={isOpenLoad}
        onClose={() => setIsOpenLoad(true)}
        className="relative z-30"
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
        body={toastBodies}
      />
    </div>
  );
};

export default UserDash;

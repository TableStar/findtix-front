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
  const dispatch = useDispatch();

  const profilePhotoSave = async (event) => {
    try {
      event.preventDefault();
      if (event.target.files[0]) {
        const formData = new FormData();
        formData.append("picture", event.target.files[0]);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const profilePhotoDelete = async () => {
    try {
      const response = await axiosInstance.delete(API_URL + "/profilepic");
      console.log(
        "🚀 ~ file: UserDash.jsx:55 ~ profilePhotoDelete ~ response:",
        response
      );
      dispatch(setProfilePic(""));
    } catch (error) {
      console.log(error);
    }
  };
  const onEditSave = async () => {
    try {
      const response = await axiosInstance.patch(
        API_URL + `/auths/edituserprops`,
        {
          firstName: inFirstName,
          lastName: inLastName,
          phoneNumber: inPhone,
          creatorCompany: inCompany,
        }
      );
      setLoader(true);
      if (response) {
        dispatch(getUserProps());
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    "🚀 ~ file: UserDash.jsx:19 ~ UserDash ~ userGlobal:",
    userGlobal
  );
  useEffect(() => {
    dispatch(keepLogin())
    // if (!userGlobal?.token) {
    //   navigate("/auth/login")
    // }
    dispatch(getPic());
    dispatch(getUserProps());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInFirstName(userPropsGlobal.firstName);
      setInLastName(userPropsGlobal.lastName);
      setInPhone(userPropsGlobal.phoneNumber);
      setInCompany(userPropsGlobal.creatorCompany);
    }, 300);
  }, [userPropsGlobal]);
  return (
    <div className="flex flex-row">
      <div className="fixed flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 w-full h-screen max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <p className="font-bold text-base md:text-2xl cursor-pointer" onClick={()=> {navigate("/")}}>
            Find<span className="font-black text-[#d2633b]">TIX</span>
          </p>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <button
            type="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Profile
          </button>
          <div
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Settings
          </div>
          <div
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Log Out
          </div>
        </nav>
      </div>
      <div className=" flex w-full h-screen max-w-[20rem] p-4"></div>
      <div className=" px-4">
        <div className="flex flex-row-reverse py-3 w-full mx-auto">
          <p className="text-sm">
            FindTix account since {userPropsGlobal.createdAt.split("T")[0]}
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
                  {profilePicGlobal && !profilePicGlobal.includes("null") ? (
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
          <div className="flex items-center cursor-pointer">
            <BiSolidPencil size={"16px"} className="text-blue-600" />
            <p className="text-xs font-medium text-slate-400">Edit Profile</p>
          </div>
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
                defaultValue={userPropsGlobal.firstName}
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
                defaultValue={userPropsGlobal.lastName}
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
                defaultValue={userPropsGlobal.phoneNumber}
              />
            </div>
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
    </div>
  );
};

export default UserDash;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBoxForm from "../InputBoxForm";
import { axiosInstance } from "../../config/axios";
import { API_URL } from "../../helper";
import { getUserProps } from "../../redux/slice/userSlice";
import { Dialog } from "@headlessui/react";
import ModalForLoading from "../ModalForLoading";
import Toast from "../Toast/Toast";

const ReferralSection = () => {
  const [inRef, setInRef] = useState("");
  const [focusRef, setFocusRef] = useState(false);
  const [isOpenLoad, setIsOpenLoad] = useState(false);
  const [openToastSuccessUp, setOpenToastSuccessUp] = useState(false);
  const userProps = useSelector((state) => state.userSliceReducer.userProps);
  const dispatch = useDispatch();
  const onSubmitRef = async () => {
    try {
      setIsOpenLoad(true);
      const response = await axiosInstance.patch(API_URL + "/auths/referral", {
        referralCode: inRef,
      });
      dispatch(getUserProps());
      setIsOpenLoad(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsOpenLoad(false);
    }
  };
  return (
    <div className=" px-4">
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Referral Code</h1>
        </div>
        <div>
          <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <p className="text-lg">
          Your referral code is:{" "}
          <span className="text-2xl font-bold">{userProps?.referralCode}</span>{" "}
        </p>
        <p className="text-lg">
          Your referral point is:{" "}
          <span className="text-2xl font-bold">{userProps?.refpoints}</span>{" "}
        </p>
        {userProps?.hasReffed ? (
          <div className="w-72">
            <p>You have already entered a referral code.</p>
            <p className="text-orange-500 capitalize font-bold text-lg">But fret not! </p>
            <p>
              You can get even more points when someone else used your referral code.
              Your friend will also get 10 points.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex">
              <div className="mb-2">
                <InputBoxForm
                  htmlName="referral"
                  placeholderText="Your Friend's Referral Code"
                  focusState={focusRef}
                  setFocusState={setFocusRef}
                  labelState={inRef}
                  onChanger={(e) => setInRef(e.target.value)}
                  names="referral"
                  inputType="text"
                  className="lg:w-80"
                />
              </div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-black w-full h-12 lg:w-30 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  onSubmitRef();
                }}
              >
                Submit
              </button>
            </div>
            <p className="w-72">
              Get 10 referral points when someone else used your referral code.
              Your friend also get 10 points
            </p>
          </div>
        )}
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
    </div>
  );
};
export default ReferralSection;

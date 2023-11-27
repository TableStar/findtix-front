import { Dialog } from "@headlessui/react";
import InputBoxForm from "../InputBoxForm";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../helper";
import ModalForLoading from "../ModalForLoading";
import { IoMailUnreadSharp } from "react-icons/io5";

const ModalForResetPass = (props) => {
  const [inEmail, setInEmail] = useState();
  const [focusEmail, setFocusEmail] = useState(false);
  const [isOpenLoad2, setIsOpenLoad2] = useState(false);
  const [hasSend, setHasSend] = useState(false);
  const onClickSubmitEmail = async () => {
    try {
      setIsOpenLoad2(true);

      const response = await axios.post(API_URL + "/forgotten/password", {
        email: inEmail,
      });
      setIsOpenLoad2(false);
      setHasSend(true);
    } catch (error) {
      console.log(error);
    //   props.onClickforX();
      setIsOpenLoad2(false);
    }
  };
  return (
    <div>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto lg:overflow-visible">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-4xl rounded-xl  px-3 py-3 bg-white">
            <div className="flex flex-row-reverse">
              <button
                className="text-4xl align-center cursor-pointer"
                onClick={props.onClickforX}
              >
                &times;
              </button>
            </div>
            {hasSend ? (
              <div className=" w-96 flex flex-col justify-center content-center items-center ">
                <IoMailUnreadSharp size="75px" color="orange" />
                <Dialog.Title className={`text-3xl text-center font-bold`}>
                  Check your email to reset your password
                </Dialog.Title>
                <div className={`text-base text-center font-bold my-6`}>
                  We sent your password reset link to {inEmail}
                </div>
                <div
                  className={`flex flex-col justify-between mx-20 my-6 gap-y-4`}
                ></div>
              </div>
            ) : (
              <div>
                <Dialog.Title className={`text-3xl text-center font-bold`}>
                  Forgot Your Password?
                </Dialog.Title>
                <div className={`text-xl text-center font-bold my-6`}>
                  Input your Email Here
                </div>
                <div
                  className={`flex flex-col justify-between mx-20 my-6 gap-y-4`}
                >
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
                  </div>
                  <button
                    className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => {
                      onClickSubmitEmail();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
          <Dialog
            open={isOpenLoad2}
            onClose={() => setIsOpenLoad2(false)}
            className="relative z-40"
          >
            <ModalForLoading />
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default ModalForResetPass;
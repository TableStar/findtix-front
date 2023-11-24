import axios from "axios";
import { API_URL } from "../../helper";

const VerifyEmail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToken = urlParams.get("token");
  console.log(paramsToken);
  console.log(API_URL);
  const emailVerification = async () => {
    try {
      const response = await axios.patch(
        API_URL + `/auths/verifyemail`,
        {},
        { headers: { Authorization: `Bearer ${paramsToken}` } }
      );
      console.log(response);
      if (response.data.message.includes("verified")) {
        alert("your account has been verified")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center text-center h-80">
      <h1 className=" text-4xl">Verify Email</h1>
      <button
        className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => {
          emailVerification();
        }}
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyEmail;

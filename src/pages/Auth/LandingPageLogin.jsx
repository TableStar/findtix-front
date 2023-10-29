import { useEffect, useState } from "react";
// import { API_URL, loginBg_URL } from "../helper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputBoxForm from "../../components/InputBoxForm";
// import { loginAction } from "../redux/action/accountAction";

const LandingPageLogin = () => {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const hasRegisterGlobal = useSelector((state) => state.hasRegisterReducer);
  const accountGlobal = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayHasRegister = () => {
    if (hasRegisterGlobal === true) {
      return (
        <p className=" text-black text-sm">
          Your account have been registered. Now you can login
        </p>
      );
    } else {
      return <div className=" h-5"></div>;
    }
  };
  // const onLogin = () => {
  //   axios
  //     .get(API_URL + `/account?username=${inUsername}&password=${inPassword}`)
  //     .then((response) => {
  //       console.log("check user", response.data);
  //       if (!response.data.length) {
  //         alert("Account Is Not Registered");
  //       } else {
  //         localStorage.setItem("dataAccount", JSON.stringify(response.data[0]));
  //         dispatch(loginAction(response.data[0]));
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   if (accountGlobal.username && accountGlobal.password) {
  //     navigate("/");
  //   }
  // }, [accountGlobal]);
  // useEffect(() => {
  //   if (localStorage.getItem("dataAccount")) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </main>

        <aside className="flex items-center justify-center px-4 py-4 sm:px-6 lg:col-span-7 lg:px-12 lg:py-8 xl:col-span-6">
          <div className=" flex flex-col justify-center items-center lg:items-baseline h-full w-full ">
            <h2 className="text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
              Login
            </h2>
            <form
              className={
                "bg-white  rounded-md max-h-fit w-10/12 px-8 pt-6 pb-8 mb-4 "
              }
            >
              {displayHasRegister()}
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
                />
              </div>
              <div className="mb-6">
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
                {focusPassword&&inPassword.length <= 0 ? (
                  <p className="text-red-500 text-xs italic">
                    Please enter a password.
                  </p>
                ) : (
                  <div className=" h-4"></div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className=" bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    // onLogin();
                  }}
                >
                  Login
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <div className=" max-w-sm mx-auto text-center mt-12 mb-6">
              <p className=" text-black text-sm">
                Don't have an account?{" "}
                <Link
                  to={"/auth/register"}
                  className="font-bold text-orange-500 hover:underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default LandingPageLogin;

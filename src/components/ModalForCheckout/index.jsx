import { Dialog } from "@headlessui/react";
import { API_URL } from "../../helper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { ImTicket } from "react-icons/im";
import InputBoxForm from "../InputBoxForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserProps } from "../../redux/slice/userSlice";
import { axiosInstance } from "../../config/axios";

const ModalForCheckout = (props) => {
  const databaseEvent = props.databaseEvent;
  console.log(
    "🚀 ~ file: index.jsx:15 ~ ModalForCheckout ~ databaseEvent:",
    databaseEvent
  );
  const ticketList = databaseEvent[0].ticketTypes;
  console.log(
    "🚀 ~ file: index.jsx:12 ~ ModalForCheckout ~ ticketList:",
    ticketList
  );
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const userPropsGlobal = useSelector(
    (state) => state.userSliceReducer.userProps
  );
  const dispatch = useDispatch();
  const [basket, setBasket] = useState([]);
  console.log("🚀 ~ file: index.jsx:30 ~ ModalForCheckout ~ basket:", basket);
  const [purchaseCount, setPurchaseCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  console.log(
    "🚀 ~ file: index.jsx:37 ~ ModalForCheckout ~ purchaseCount:",
    purchaseCount
  );
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(
    "🚀 ~ file: index.jsx:38 ~ ModalForCheckout ~ totalPrice:",
    totalPrice
  );
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [inFirstName, setInFirstName] = useState(``);
  const [inLastName, setInLastName] = useState(``);
  const [inPhone, setInPhone] = useState(``);
  const [inEmail, setInEmail] = useState(``);
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [hasCheckout, setHasCheckout] = useState(false);
  const ticketCount = basket.reduce((acc, val) => {
    return acc + val.quantity;
  }, 0);
  console.log("🚀 ~ file: index.jsx:51 ~ idx ~ basket:", basket);
  const onSubmitCheckout = async () => {
    try {
      const response = await axiosInstance.post(API_URL + "/transaction", {
        eventId: databaseEvent[0].id,
        buyerFirstName: inFirstName,
        buyerLastName: inLastName,
        buyerEmail: inEmail,
        buyerPhone: inPhone,
        ticketCount: ticketCount,
        totalPayment: totalPrice,
        totalTickets: basket.map((val, idx) => {
          return {
            ticketName: val.name,
            ticketTypeId: val.id,
            quantity: val.quantity,
            ticketPrice: val.price + 2000,
          };
        }),
      });
      console.log(
        "🚀 ~ file: index.jsx:67 ~ onSubmitCheckout ~ response:",
        response
      );
      setHasCheckout(true);
      setPurchaseCount({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      });
      setBasket([]);
      setTotalPrice(0);
      setSubTotalPrice(0);
      setInFirstName(userPropsGlobal?.firstName);
      setInLastName(userPropsGlobal?.lastName);
      setInPhone(userPropsGlobal?.phoneNumber);
      setInEmail(userPropsGlobal?.email);
      window.open(response.data.result.redirect_url);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const OrderList = (data) => {
    const idx = basket.findIndex((val) => {
      return val.id === data.id;
    });
    const temp = [...basket];
    if (idx < 0) {
      temp.push({ ...data, quantity: 1 });
    } else {
      temp[idx] = { ...temp[idx], quantity: temp[idx].quantity + 1 };
    }
    setBasket(temp);
  };
  const onHandleDeleteOrder = (props) => {
    const existingOrder = basket.find((orderItem) => orderItem.id === props.id);
    if (existingOrder) {
      const idx = basket.findIndex((orderItem) => orderItem.id === props.id);

      if (existingOrder.quantity > 1) {
        const updatedOrder = basket.map((orderItem) =>
          orderItem.id === props.id
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        );
        setBasket(updatedOrder);
      } else {
        // If quantity is 1, remove the item from the order
        const updatedOrder = [...basket];
        updatedOrder.splice(idx, 1);
        setBasket(updatedOrder);
      }
    }
  };
  const sumBasket = () => {
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
      sum += basket[i].price * basket[i].quantity;
    }
    setSubTotalPrice(sum);
    setTotalPrice(sum + 2000 * ticketCount);
  };
  useEffect(() => {
    dispatch(getUserProps());
  }, []);
  useEffect(() => {
    sumBasket();
  }, [basket]);
  useEffect(() => {
    setTimeout(() => {
      setInFirstName(userPropsGlobal?.firstName);
      setInLastName(userPropsGlobal?.lastName);
      setInPhone(userPropsGlobal?.phoneNumber);
      setInEmail(userPropsGlobal?.email);
    }, 300);
  }, [userPropsGlobal]);
  console.log(
    "🚀 ~ file: index.jsx:66 ~ ModalForCheckout ~ userPropsGlobal:",
    userPropsGlobal
  );
  return (
    <Dialog open={props.opener} onClose={props.onCloser}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto lg:overflow-visible">
        {/* Container to center the panel */}
        <br />
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          {hasCheckout ? (
            <Dialog.Panel className="mx-auto max-w-4xl md:h-[500px] md:w-[800px]  rounded-xl   px-3 py-3 bg-white">
              <div className="flex content-end justify-end">
                <button
                  className="flex text-3xl cursor-pointer absolute z-20 rounded-full w-7 h-7 items-center justify-center bg-white/80"
                  onClick={() => {
                    props.onCloser();
                    setHasCheckout(false);
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col justify-center items-center h-full w-full">
                <ImTicket size="75px" color="orange" />
                <Dialog.Title className={`text-3xl text-center font-bold`}>
                  Payment Processed
                </Dialog.Title>
                <div className={`text-base text-center font-bold my-6`}>
                  Finish your payment to receive your tickets
                </div>
              </div>
            </Dialog.Panel>
          ) : (
            <Dialog.Panel className="mx-auto max-w-4xl max-h-screen lg:max-h-[500px] rounded-xl   px-3 py-3 bg-white">
              <div className="flex">
                <div className="h-full w-8/12  px-1">
                  <div className="text-center">
                    <Dialog.Title className={`text-2xl text-center font-bold`}>
                      {databaseEvent[0]?.name}
                    </Dialog.Title>
                    <div className="text-sm text-gray-400">
                      {props.eventTime.date} · {props.eventTime.startTime[0]}:
                      {props.eventTime.startTime[1]} -{" "}
                      {props.eventTime.endTime[0]}:{props.eventTime.endTime[1]}{" "}
                      WIB
                    </div>
                    <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
                    <div className="underTitle flex flex-col max-h-96 overflow-y-auto gap-y-8">
                      <div className="flex flex-col mx-3 ">
                        <div className="text-lg text-left font-bold">
                          Tickets
                        </div>
                        <div className="ticketChooseContainer flex flex-col gap-y-5">
                          {ticketList.map((val, idx) => {
                            return (
                              <div
                                key={idx}
                                className="border-[2px] flex flex-col p-4 border-blue-700 rounded-md gap-6"
                              >
                                <div className="flex justify-between gap-8">
                                  <span className="font-medium">
                                    {val.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      className={`p-1 rounded-md ${
                                        purchaseCount[idx + 1] === 0
                                          ? "bg-[#f4f2f8] text-gray-400"
                                          : "bg-blue-700 text-white"
                                      }`}
                                      onClick={() => {
                                        setPurchaseCount({
                                          ...purchaseCount,
                                          [idx + 1]: purchaseCount[idx + 1] - 1,
                                        });
                                        onHandleDeleteOrder(val);
                                      }}
                                      disabled={
                                        purchaseCount[idx + 1] < 1
                                          ? true
                                          : false
                                      }
                                    >
                                      <AiOutlineMinus />
                                    </button>
                                    <span>{purchaseCount[idx + 1]}</span>
                                    <button
                                      className="bg-blue-700 text-white p-1 rounded-md"
                                      onClick={() => {
                                        setPurchaseCount({
                                          ...purchaseCount,
                                          [idx + 1]: purchaseCount[idx + 1] + 1,
                                        });
                                        OrderList(val);
                                      }}
                                    >
                                      <AiOutlinePlus />
                                    </button>
                                  </div>
                                </div>
                                <span className="flex items-center gap-4">
                                  {!val.price
                                    ? "Free"
                                    : `Rp. ${val.price.toLocaleString("id")}`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col mx-3 text-left">
                        <div className="text-lg font-bold">
                          Billing Information
                        </div>
                        {userGlobal.username ? (
                          <p className="text-sm">
                            Logged in as{" "}
                            <span className="font-extrabold text-gray-500">
                              {userGlobal?.username}
                            </span>
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="billingContainer flex flex-col gap-y-5">
                          <form
                            className={
                              "bg-white  rounded-md max-h-fit lg:w-10/12 px-2 pt-6 pb-8 mb-4 "
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
                                  onChanger={(e) =>
                                    setInFirstName(e.target.value)
                                  }
                                  names="first name"
                                  inputType="text"
                                  className={` lg:w-56`}
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
                                  onChanger={(e) =>
                                    setInLastName(e.target.value)
                                  }
                                  names="last name"
                                  inputType="text"
                                  className={` lg:w-56`}
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
                                  className={` lg:w-56`}
                                  defaultValue={userPropsGlobal?.phoneNumber}
                                />
                              </div>
                              <div className="mb-6">
                                <InputBoxForm
                                  htmlName="email"
                                  placeholderText="Your Email"
                                  focusState={focusEmail}
                                  setFocusState={setFocusEmail}
                                  labelState={inEmail}
                                  onChanger={(e) => setInEmail(e.target.value)}
                                  names="email"
                                  inputType="text"
                                  className={` lg:w-56`}
                                  defaultValue={userGlobal.email}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="flex gap-y-2 justify-end">
                          <button
                            className=" bg-orange-500 hover:bg-orange-600 text-black w-full lg:w-52 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                              onSubmitCheckout();
                            }}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full w-4/12 gap-y-3">
                  <div className="flex content-end justify-end">
                    <button
                      className="flex text-3xl cursor-pointer absolute z-20 rounded-full w-7 h-7 items-center justify-center bg-white/80"
                      onClick={() => {
                        props.onCloser();
                      }}
                    >
                      &times;
                    </button>
                    <img src={databaseEvent[0].img} />
                  </div>
                  <div className="basket flex flex-col gap-y-5 font-semibold">
                    {basket.length > 0 ? (
                      <p className="text-sm ">Order Summary</p>
                    ) : (
                      ""
                    )}
                    <div>
                      {basket.map((val, idx) => {
                        return (
                          <div
                            key={idx}
                            className="flex text-xs gap-x-1 gap-y-2 justify-between"
                          >
                            <p className="break-normal">
                              {val.quantity}x {val.name}
                            </p>
                            <p className="break-keep">
                              {" "}
                              {!val.price
                                ? "Free"
                                : `Rp. ${(
                                    val.price * val.quantity
                                  ).toLocaleString("id")}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {basket.length > 0 ? (
                      <div>
                        <div className="flex text-xs gap-x-1  justify-between">
                          <p className="break-normal">Subtotal</p>
                          <p className="break-normal">
                            Rp. {subTotalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="flex text-xs gap-x-1  justify-between">
                          <p className="break-normal">Fee</p>
                          <p className="break-normal">
                            Rp.{" "}
                            {(
                              2000 *
                              basket.reduce((acc, val) => {
                                return acc + val.quantity;
                              }, 0)
                            ).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="flex text-xs gap-x-1  justify-between my-5">
                          <p className="break-normal">TOTAL</p>
                          <p className="break-normal">
                            Rp. {totalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalForCheckout;

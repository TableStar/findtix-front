import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBoxForm from "../InputBoxForm";
import { axiosInstance } from "../../config/axios";
import { API_URL } from "../../helper";
import { getUserProps } from "../../redux/slice/userSlice";
import { Dialog } from "@headlessui/react";
import ModalForLoading from "../ModalForLoading";
import Toast from "../Toast/Toast";

const OrderAndTickets = () => {
  const [inRef, setInRef] = useState("");
  const [focusRef, setFocusRef] = useState(false);
  const [isOpenLoad, setIsOpenLoad] = useState(false);
  const [openToastSuccessUp, setOpenToastSuccessUp] = useState(false);
  const [toastBodies, setToastBodies] = useState("");
  const userProps = useSelector((state) => state.userSliceReducer.userProps);
  const [trans, setTrans] = useState([]);
  console.log("🚀 ~ file: index.jsx:19 ~ OrderAndTickets ~ trans:", trans);
  const dispatch = useDispatch();
  const getAllTrans = async () => {
    try {
      const response = await axiosInstance.get(API_URL + "/transaction");
      console.log(
        "🚀 ~ file: index.jsx:23 ~ getAllTrans ~ response:",
        response
      );
      setTrans(response.data.result);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const caseStatus = (status) => {
    switch (status) {
      case "waiting":
        return (
          <div className="font-semibold text-xl capitalize text-amber-500 ">
            waiting
          </div>
        );
        break;
      case "success":
        return (
          <div className="font-semibold text-xl capitalize text-green-500 ">
            Paid
          </div>
        );
        break;
      case "cancelled":
        return (
          <div className="font-semibold text-xl capitalize text-red-500 ">
            cancelled
          </div>
        );
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    getAllTrans();
  }, []);
  return (
    <div className="flex flex-col mx-3">
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Orders</h1>
        </div>
        <div>
          <div className="w-full h-[1px] my-4 bg-slate-300 mx-auto"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-8">
        {trans.map((val, idx) => {
          return (
            <div
              key={idx}
              className="block p-3 bg-white border border-gray-200 rounded-lg shadow lg:w-[800px] "
            >
              <div className="flex mb-2  text-gray-900">
                <div className="flex flex-col bg-white border border-gray-200 shadow w-1/3 p-1">
                  <div className="font-semibold text-orange-600 text-sm ">
                    INVOICE NO:
                  </div>
                  <div className="font-semibold text-lg ">
                    {val.transactionInvoice}
                  </div>
                  <div className="text-xs text-gray-400 ">
                    {new Date(val.createdAt).toLocaleString("en-GB", {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 shadow w-1/3 p-1">
                  <div className="font-semibold text-orange-600 text-sm">
                    TOTAL:
                  </div>
                  <div className="font-semibold text-lg ">
                    Rp {val.totalPayment.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 shadow w-1/3 p-1">
                  <div className="font-semibold text-orange-600 text-sm">
                    PAYMENT STATUS:
                  </div>
                  {caseStatus(val.paymentStatus)}
                </div>
              </div>
              <div className="flex flex-col bg-white w-1/2 p-1">
                <div className="font-semibold text-orange-600 text-xl ">
                  {val.name}
                </div>
                <div className="text-sm text-gray-400 ">{val.ticketCount}x Tickets</div>
              </div>
            </div>
          );
        })}
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
        body={toastBodies}
      />
    </div>
  );
};
export default OrderAndTickets;

import { FaXTwitter } from "react-icons/fa6";
import { BiSolidErrorCircle } from "react-icons/bi";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

const Toast = (props) => {
  const ToastType = (type) => {
    switch (type) {
      case "error": {
        return (
          <div className="flex gap-x-4">
            <BiSolidErrorCircle size={"40px"} color="red" />
            <div
              id="body"
              style={{ display: "flex", flexDirection: "column", width: "80%" }}
            >
              <h2>{props.head}</h2>
              <p>{props.body}</p>
            </div>
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <p className="text-4xl">&times;</p>
            </button>
          </div>
        );
      }
      case "success": {
        return (
          <div className="flex gap-x-4">
            <FaCheckCircle size={"40px"} color="green" />
            <div
              id="body"
              style={{ display: "flex", flexDirection: "column", width: "80%" }}
            >
              <h2>{props.head}</h2>
              <p>{props.body}</p>
            </div>
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <p className="text-4xl">&times;</p>
            </button>
          </div>
        );
      }
      case "info": {
        return (
          <div className="flex gap-x-4">
            <AiFillInfoCircle size={"40px"} color="blue" />
            <div
              id="body"
              style={{ display: "flex", flexDirection: "column", width: "80%" }}
            >
              <h2>{props.head}</h2>
              <p>{props.body}</p>
            </div>
            <span style={{ cursor: "pointer" }} onClick={props.onClose}>
              <FaXTwitter />
            </span>
          </div>
        );
      }
    }
  };
  const ToastColor = () => {
    switch (props.type) {
      case "error":
        return "#CB3831";
      case "info":
        return "#1478f4";
      case "success":
        return "#228B22";
      default:
        break;
    }
  };
  return (
    <div className={`${props.open?`block`:`none`} z-40 fixed right-[${props.right}] top-[${props.top}]`}
      style={{
        display: props.open ? "block" : "none",
        right: props.right,
        top: props.top,
        left: props.left,
        bottom: props.bottom,
        width: "400px",
        padding: "12px 16px",
        borderLeft: `6px solid ${ToastColor()}`,
        borderRadius: "8px",
        boxShadow: "1px 1px 4px rgba(0,0,0,0.6)",
        backgroundColor: "white",
      }}
    >
      {ToastType(props.type)}
    </div>
  );
};

export default Toast;
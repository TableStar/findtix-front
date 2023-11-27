import { useState } from "react";
import PriceEvent from "../PriceEvent";

const Modal = () => {
    return(
        <div className="">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-outline" onClick={()=>document.getElementById('my_modal_4').showModal()}>Open Modal</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Hello!</h3>
    <PriceEvent />
    <div className="modal-action">
      <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    )
};

export default Modal;
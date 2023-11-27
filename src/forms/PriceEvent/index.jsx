import { useState } from "react";

const PriceEvent = () => {
  const [typeTicket, setTypeTicket] = useState("paid");
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-full border border-slate-300 divide-y rounded">
      <div className="p-4">
        <button
          className="flex items-center gap-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-xl font-bold">Add Ticket</h3>
          <span className="text-2xl">{isOpen?"+":"-"}</span>
        </button>
      </div>
      <div className={`${isOpen ? "hidden" : "p-4 flex flex-col gap-5"}`}>
        <div className="flex gap-8">
          <button
            type="button"
            className={`${
              typeTicket == "paid"
                ? "border bg-blue-900/25 text-blue-800 border-blue-800"
                : "border"
            }  hover:bg-blue-900/25 hover:text-blue-800 hover:border-blue-800 focus:ring-4 focus:ring-blue-300 focus:border-blue-800 font-medium rounded-sm text-sm px-8 py-3 text-center`}
            onClick={() => setTypeTicket("paid")}
          >
            Paid
          </button>
          <button
            type="button"
            className={`${
              typeTicket == "free"
                ? "border bg-blue-900/25 text-blue-800 border-blue-800"
                : "border border-slate-400"
            }  hover:bg-blue-900/25 hover:text-blue-800 hover:border-blue-800 focus:ring-4 focus:ring-blue-300 focus:border-blue-800 font-medium rounded-sm text-sm px-8 py-3 text-center`}
            onClick={() => setTypeTicket("free")}
          >
            Free
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
        <div class="relative z-0 col-span-2">
          <input 
          type="text" 
          name="name" 
          className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-[#d2633b] focus:outline-none focus:ring-0" 
          placeholder=" " />
          <label 
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b]">
            Your name</label>
        </div>
        </div>
        <div class="relative z-0 col-span-2">
          <input 
          type="number" 
          name="quantity" 
          className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-[#d2633b] focus:outline-none focus:ring-0" 
          placeholder="" />
          <label
          htmlFor="quantity" 
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b]">
            Quantity</label>
        </div>
        {typeTicket == "paid" && (
          <div class="relative z-0 col-span-2">
          <input 
          type="text" 
          name="price" 
          className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-[#d2633b] focus:outline-none focus:ring-0" 
          placeholder="" />
          <label 
          htmlFor="price"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b]">
            Price</label>
        </div>
        )}
        <div>
          <label
            htmlFor="startDate"
            className="block mb-2 text-sm font-medium text-slate-900"
          >
            Start Date
          </label>
          <div className="grid gap-5 grid-cols-2">
            <input
              type="date"
              id="startDate"
              className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            <input
              type="time"
              className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="salesEnd"
            className="block mb-2 text-sm font-medium text-slate-900"
          >
            Sales End
          </label>
          <div className="grid gap-5 grid-cols-2">
            <input
              type="date"
              id="salesEnd"
              className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            <input
              type="time"
              className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "hidden" : "p-4"}`}>
        <button
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-800 hover:text-blue-50 focus:ring-4 focus:ring-blue-300 focus:border-blue-800 font-medium rounded text-sm px-8 py-3 text-center w-full"
        >
          Save Ticket
        </button>
      </div>
    </div>
  );
}

export default PriceEvent;
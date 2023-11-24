import { useState } from "react";

const PriceEvent = () => {
    const [typeTicket, setTypeTicket] = useState("paid");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="max-w-sm border border-slate-300 divide-y rounded">
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
        <div className="flex gap-5">
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
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-slate-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="General Admission"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-slate-900"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="110"
            required
          />
        </div>
        {typeTicket == "paid" && (
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-slate-900"
            >
              Price
            </label>
            <input
              type="nember"
              id="price"
              className="border border-slate-400 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="100000"
              required
            />
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
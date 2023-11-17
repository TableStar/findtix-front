import { Dialog } from "@headlessui/react";

const ModalForRegister = (props) => {
  return (
    <div>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 w-screen overflow-y-auto lg:overflow-visible">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-5xl rounded-xl shadow-lg shadow-orange-500 px-3 py-3 bg-white">
            <div className="flex flex-row-reverse">
              <button
                className="text-4xl align-center cursor-pointer"
                onClick={props.onClickforX}
              >
                &times;
              </button>
            </div>
            <Dialog.Title className={`text-4xl text-center font-bold`}>
              One Last Step
            </Dialog.Title>
            <div className={`text-3xl text-center font-bold my-6`}>
              What do you want to do here?
            </div>
            <div
              className={`flex flex-row justify-between mx-20 my-6 gap-x-20`}
            >
              <div
                onClick={props.onClickForAttendee}
                className="max-w-xs bg-white border border-gray-200 rounded-lg shadow hover:border-orange-500 cursor-pointer  "
              >
                <img
                  className="rounded-t-lg w-80 max-h-xs object-contain overflow-hidden"
                  src="https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/06/free-events-768x512.png"
                  alt="goingToEvent"
                />
                <div className=" p-8 h-full w-full text-center items-center content-center">
                  <h2 className=" font-bold text-3xl">Experience Our Events</h2>
                </div>
              </div>
              <div
                onClick={props.onClickForCreator}
                className="max-w-xs bg-white border border-gray-200 rounded-lg shadow hover:border-orange-500 cursor-pointer "
              >
                <img
                  className="rounded-t-lg max-h-xs w-80 object-contain overflow-hidden"
                  src="https://www.midas-pr.com/wp-content/uploads/2021/07/Benefits-of-PR-in-E-events-pre-planning-to-post-publicity-scaled.jpg"
                  alt="planningEvent"
                />
                <div className=" p-8 h-full w-full text-center items-center content-center">
                  <h2 className=" font-bold text-3xl">
                    Plan and Create Events
                  </h2>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </div>
  );
};

export default ModalForRegister;

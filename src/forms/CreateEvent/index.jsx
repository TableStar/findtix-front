import LayoutPage from "../../components/LayoutPage";
import axios from "axios";
import { useEffect, useState } from "react";
// import './style.css'
import { API_URL } from "../../helper";
import PriceEvent from "../PriceEvent";
import Modal from "../Modal";
import { useSelector } from "react-redux";


const CreateEvent = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get("/categories");
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }
      formDataObj.append("fileupload", selectedImage);
  
      const response = await axios.post( API_URL + "/events/create", formData, formDataObj);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };
  
  
  //func img
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");


  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);

    const previewURL = URL.createObjectURL(image);
    setImagePreview(previewURL);
  };

  //func limit word
  const [description, setDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 1000;

  const handleDescriptionChange = (event) => {
    const inputText = event.target.value;
    const currentWordCount = words.length - 1;
    setWordCount(currentWordCount);

    if (currentWordCount <= maxWords) {
      setDescription(inputText);
    }
  };
    const categoryDatabase = useSelector((state) => { return state.categoryReducer.categories })
    console.log(categoryDatabase);
  
  return (
    <LayoutPage>
      <main className="min-h-screen py-10 px-2 md:px-8">
        <form action="" method="post" className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              What type of event do you want to create
            </h3>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Category
            </label>
            <select
            id="categoryId"
  name="categoryId"
  value={formData.categoryId}
  onChange={() => {
    handleChange
    alert("testing")
  }}

  required
  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#d2633b] focus:border-[#d2633b] block w-full p-2.5"
>
  <option value="" disabled selected>
    Choose a Category
  </option>
  {categoryDatabase.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>

          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Basic info</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative z-0">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b] focus:outline-none focus:ring-0 focus:border-[#d2633b] peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Event title
                </label>
              </div>
              <div className="relative z-0">
              <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b]  focus:outline-none focus:ring-0 focus:border-[#d2633b]  peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="status"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Status
                </label>
              </div>
              <div className="relative z-0">
              </div>
              <div className="relative z-0 col-span-2">
                <input
                  type="text"
                  id="caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b]  focus:outline-none focus:ring-0 focus:border-[#d2633b]  peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="caption"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Caption
                </label>
              </div>
            </div>
          </div>
          <div>
      
  <label className="label cursor-pointer">
    <span>Online</span> 
    <input
      type="checkbox"
      className="toggle"
      checked={isOnline}
      onChange={() => setIsOnline(!isOnline)}
    />
    <span>Offline</span>
  </label>


            <h3 className="text-2xl font-bold mb-4">Location</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative z-0">
                <select
                  id="city"
                  name="city"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b] focus:outline-none focus:ring-0 focus:border-[#d2633b] peer"
                  required
                >
                  <option value="category" disabled defaultValue>
                    City
                  </option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Other">Other</option>
                </select>
                <label
                  htmlFor="city"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Select City
                </label>
              </div>

              {!isOnline && (
  <div className="relative z-0">
    <input
      type="text"
      id="location"
      name="location"
      value={formData.location}
      onChange={handleChange}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b] focus:outline-none focus:ring-0 focus:border-[#d2633b] peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="location"
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b] peer-focus:dark:text-[#d2633b] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      Location
    </label>
  </div>
)}

            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Date and Time</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex gap-5 relative z-0">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b]  focus:outline-none focus:ring-0 focus:border-[#d2633b]  peer"
                  required
                />
                <input
                  type="time"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b]  focus:outline-none focus:ring-0 focus:border-[#d2633b]  peer"
                  required
                />
                <label
                  htmlFor="startDate"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b]  peer-focus:dark:text-[#d2633b]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Event Start
                </label>
              </div>
              <div className="flex gap-5 relative z-0">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b]  focus:outline-none focus:ring-0 focus:border-[#d2633b]  peer"
                  required
                />
                <input
                  type="time"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#d2633b]  focus:outline-none focus:ring-0 focus:border-[#d2633b]  peer"
                  required
                />
                <label
                  htmlFor="endDate"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#d2633b]  peer-focus:dark:text-[#d2633b]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Event End
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Main Event Image</h3>
            <div className="grid grid-cols-1 space-y-2">
  <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
  <div className="flex items-center justify-center w-full">
    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
      <div className="h-full w-full text-center flex flex-col  justify-center items-center">
        {imagePreview ? (
          <img className="h-36 object-center" src={imagePreview} alt="Preview" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        )}
        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <p className="pointer-none text-gray-500">
          <span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer
        </p>
      </div>
    </label>
  </div>
</div>
<p className="text-sm text-gray-300">
  <span>File type: doc, pdf, types of images</span>
</p>

          </div>
          <div>
      <h3 className="text-2xl font-bold mb-4">Description</h3>
      <textarea
  id="message"
  rows="6"
  value={description}
  onChange={handleDescriptionChange}
  className="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  placeholder="Write a description for your event"
  required
></textarea>
<p className="text-sm text-gray-500 mt-2">
  {formData?.description?.split(/\s+/).filter(Boolean).length}/{maxWords} words
</p>
      <div className="text-center">
      <button 
      type="submit"
      onClick={handleSubmit}
      className="btn btn-outline">Add Ticket</button>
    </div>
    </div>
    <Modal />
    <PriceEvent />
        </form>
      </main>
    </LayoutPage>
  );
};

export default CreateEvent;

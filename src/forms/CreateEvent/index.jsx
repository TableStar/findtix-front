import LayoutPage from "../../components/LayoutPage";
import axios from "axios";
import { useEffect, useState } from "react";
import './style.css'

const CreateEvent = () => {
  
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    seats: "",
    tags: "",
    caption: "",
    city: "",
    address: "",
    startDate: "",
    endDate: "",
    img: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/events/create", formData);
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
  const maxWords = 300;

  const handleDescriptionChange = (event) => {
    const inputText = event.target.value;
    const words = inputText.split(/\s+/);
    const currentWordCount = words.length - 1;
    setWordCount(currentWordCount);

    if (currentWordCount <= maxWords) {
      setDescription(inputText);
    }
  };
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
              id="category"
              name="catrgory"
              value={formData.category}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Choose a Category</option>
              <option value="Sport">Sport</option>
              <option value="Education">Education</option>
              <option value="Art">Art</option>
              <option value="Concert">Concert</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Basic info</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative z-0">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Event title
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="seats"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="seats"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Seats
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="tags"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Tags
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="caption"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Caption
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Location</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative z-0">
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Select City
                </label>
              </div>

              <div className="relative z-0">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="address"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Address
                </label>
              </div>
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <input
                  type="time"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="startDate"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <input
                  type="time"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="endDate"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Event End
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Main Event Image</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <img
                className="h-auto max-w-md md:max-w-full rounded-lg"
                src={imagePreview || "https://flowbite.com/docs/images/examples/image-3@2x.jpg"}
                alt="image description"
              />
              <div className="relative z-0">
                <input
                  type="file"
                  id="img"
                  name="img"
                  value={formData.img}
                  onChange={handleImageChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="img"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Upload Image
                </label>
              </div>
            </div>
          </div>
          <div>
      <h3 className="text-2xl font-bold mb-4">Description</h3>
      <textarea
        id="message"
        rows="6"
        value={formData.description}
        onChange={handleDescriptionChange}
        className="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write a description for your event"
        required
      ></textarea>
      <p className="text-sm text-gray-500 mt-2">
        {wordCount}/{maxWords} words
      </p>
      <div className="text-center">
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Submit Event
      </button>
    </div>
    </div>
        </form>
      </main>
    </LayoutPage>
  );
};

export default CreateEvent;

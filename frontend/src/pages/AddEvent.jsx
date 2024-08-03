import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import host from '../host';
import Cookie from 'js-cookie';
import toast from 'react-hot-toast';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    description: ""
  });
  const eToken = sessionStorage.getItem("eToken");

  const handleValidation = () => {
    const { name, date, description, location } = eventData;
    if (name === "") {
      toast.error("Please enter name!", { duration: 1000 });
      return false;
    } else if (date === "") {
      toast.error("Please enter date !", { duration: 1000 });
      return false;
    } else if (location === "") {
      toast.error("Please enter location !", { duration: 1000 });
      return false;
    } else if (description === "") {
      toast.error("Please enter description !", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleEventCreation = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const url = `${host}/events`;
        const { name, date, description, location } = eventData;
        const formattedLocation = location[0].toUpperCase() + location.slice(1)
       
        const res = await axios.post(url, {
          name, date, description, location:formattedLocation
        }, {
          headers: {
            "auth-token": eToken
          }
        });

        if (res.status === 201) {
          toast.success(res.data.message, { duration: 1000 });
          setEventData({
            name: "",
            date: "",
            location: "",
            description: ""
          });
        } else {
          toast.error(res.data.message, { duration: 1000 });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { duration: 1000 });
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
        <div className="min-w-[300px] max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-[80%]">
          <form className="space-y-6" onSubmit={handleEventCreation}>
            <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">Add Event</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import dayjs from 'dayjs'
import { MdDeleteOutline } from "react-icons/md";
import Navbar from '../components/Navbar'
import host from '../host';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)
  const eToken = sessionStorage.getItem("eToken")
  const navigate = useNavigate()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const url = host + "/events"
      const res = await axios.get(url, {
        headers:{
          "auth-token":eToken
        }
      })
      if(res.status === 200){
        setEvents(res.data.events)
        setLoading(false)
      }else{
        toast.error(res.data.message, {duration:1000})
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete= async(id) => {

try {
  const url = host + "/events/" + id
  const res = await axios.delete(url, {
    headers:{
      "auth-token":eToken
    }
  })
  if(res.status === 200){
    toast.success(res.data.message, {duration:1000})
    fetchEvents()
  }
} catch (error) {
  console.log(error.message)
}

  }

  const renderEmptyView = () => {
return(
  <h1 className='text-3xl text-black dark:text-white text-center font-semibold'>Events Empty</h1>
)
  }

  //add event completed feature 

  return (
    <>
    <Navbar/>
    
    <div style={{minHeight:"calc(100dvh - 60px)"
    }} className="min-h-dvh bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto py-10 w-[80%]">
       

        {loading ? 
        <div className="flex items-center justify-center min-h-[50vh] 
        ">
          <Loader/>
        </div>
      : 

      <>

      {
        events?.length === 0 ? renderEmptyView() : 
     <>
        <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-8">All Events</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-3 gap-6">

          {events?.map(event => (
            <li onClick={() => navigate(`/event-details/${event._id}`)} key={event._id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">

              <div className="flex justify-between items-center  mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">{event.name}</h3>
                <MdDeleteOutline color='crimson'  onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(event._id)
                }} className='dark:text-white  text-black text-xl cursor-pointer'/>
              </div>
             

              <div className="flex items-center gap-2 mb-2">
              <p className='text-sm text-gray-600 dark:text-gray-300 font-semibold'>Date:</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{dayjs(event.date).format("MMM D, YYYY")}</p>
              </div>

              <div className="flex items-center gap-2 mb-2">
              <p className='text-sm font-semibold text-gray-600 dark:text-gray-300'>Location:</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{event.location}</p>
              </div>
              
              <p className=" text-sm text-gray-600 dark:text-gray-300 max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{event.description}</p>
            </li>
          ))}
        </ul></>
         }
      </>
}
      </div>
    </div>
    </>
  );
};

export default Events;

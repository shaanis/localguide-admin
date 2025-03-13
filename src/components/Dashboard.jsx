import React, { useContext, useEffect, useState } from 'react';
import { getAllPendingBookingApi, getAllUserApi, getPlaceApi, getPlaceCountApi } from '../services/allApi';
import { getPlaceContext } from '../context/ContextApi';
import { Link } from 'react-router-dom';
import {  Circle } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [Place,setPlace] = useState('')
  const [booking,setBookings] = useState('')

  useEffect(() => {
    getUser();
    getPlace()
    
  }, []);
  useEffect(()=>{
    getPendingStatus()
    const interval = setInterval(getPendingStatus,5000)
    return ()=>clearInterval(interval)
  },[])

  const getUser = async () => {
    try {
      const result = await getAllUserApi();
      if (result?.data) {
        setUser(result.data);
      } else {
        console.error('Unexpected API response:', result);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const getPlace = async()=>{
    try{
      const result = await getPlaceCountApi()
      if(result.status == 200){
        console.log(result.data);
        setPlace(result.data)
        
      }
    }catch(e){
      console.log(e);
      
    }
  }

  const getPendingStatus=async()=>{
    const result = await getAllPendingBookingApi()
    if(result.status==200){
      setBookings(result.data)
      console.log(result.data);
      
    }
  }
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-red-500 mt-10">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          Total Places: { Place ? Place.length : 0}
        </div>
        <div className="p-4 bg-white shadow rounded">
          Total Users: {user ? user.length : 0}
        </div>
        <div className="p-4 bg-white shadow rounded">
          <div className='flex justify-between'><h4>Bookings</h4>
          { booking.length>0 ?
            <Circle className='bg-amber-400 rounded-full border-amber-400' size={10}/> :""

          }
           </div>
           <Link to={'/bookings'} style={{textDecoration:"none",color:"black"}}>You have <span className='text-red-600 font-bold'>{booking ? booking.length:""}</span> New Booking</Link>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;

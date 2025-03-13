import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { showBookingsApi, updatePendingBookingApi } from "../services/allApi";
import { toast } from "react-toastify";

const Bookings = () => {
    const[bookings,setBookings]=useState([])
    const[searchKey,setSearchKey]=useState("")
    useEffect(()=>{
      allBookings()
      const intervel = setInterval(allBookings,5000)
      return ()=>clearInterval(intervel)
    },[searchKey])
    const allBookings = async () => {
      const result = await showBookingsApi(searchKey);
      if (result.status >= 200 && result.status < 300) {
          const sortedBookings = result.data.sort((a, b) => 
              a.status === "pending" ? -1 : b.status === "pending" ? 1 : 0
          );
          setBookings(sortedBookings);
          console.log(sortedBookings);
      }
  };
  

    const statusUpdate =async(id,status)=>{
      const result = await updatePendingBookingApi(id,status)
      if (result.status >= 200 && result.status < 300) {
        allBookings(); 
        toast.success("Message Readed")
      }
    
    }
  return (
    <div className="container mx-auto p-6">
      <div className="shadow-2xl rounded-lg p-6 bg-white">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">Bookings</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2 pt-5 text-gray-500" size={20} />
            <input  onChange={e=>setSearchKey(e.target.value)}
              type="text" 
              className="pl-10 border rounded-lg py-3 w-full bg-gray-100 text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" 
              placeholder="Search by name..." 
            />
          </div>
          <div className="w-full md:w-auto">
            <select className="border rounded-lg p-3 w-full md:w-[200px] bg-gray-100 text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500">
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-xl text-gray-900">
            <thead>
              <tr className="bg-blue-500 text-white text-lg">
                <th className="border p-4">ID</th>
                <th className="border p-4">Name</th>
                <th className="border p-4">Event Name</th>
                <th className="border p-4">Booked tickets</th>
                <th className="border p-4">Total price</th>
                <th className="border p-4">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {
                bookings?.length>0? (
                    bookings.map(item=>(
                <tr onClick={()=>statusUpdate(item._id ,"checked")} key={item?._id} className={`border hover:bg-gray-200 transition-all ${item.status == "pending" ? "bg-blue-400 text-white" : "bg-white text-black"}`}>
                <td className="border p-4">{item?._id}</td>
                <td className="border p-4">{item?.userId?.username}</td>
                <td className="border p-4">{item?.eventName}</td>
                <td className="border p-4">{item?.ticketCount}</td>
                <td className="border p-4">{item?.totalPrice}</td>
                <td className="border p-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full shadow-md">Confirmed</span>
                </td>
              </tr>
                    ))
                ):
                <tr>No bookings</tr>
              }
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

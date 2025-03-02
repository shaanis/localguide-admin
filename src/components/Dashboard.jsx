import React, { useContext, useEffect, useState } from 'react';
import { getAllUserApi, getPlaceApi, getPlaceCountApi } from '../services/allApi';
import { getPlaceContext } from '../context/ContextApi';

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [Place,setPlace] = useState('')

  useEffect(() => {
    getUser();
    getPlace()
  }, []);

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
        <div className="p-4 bg-white shadow rounded">Pending Reviews: 10</div>
      </div>
    </div>
  );
};

export default Dashboard;

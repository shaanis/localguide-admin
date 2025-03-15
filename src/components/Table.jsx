import React, { useEffect, useState } from "react";
import { deletePlaceApi, getPlaceApi } from "../services/allApi";
import serverurl from "../services/serverurl";
import { Button } from "react-bootstrap";
import Edit from "./Edit";
import { toast } from 'react-toastify';
import { Box, Skeleton } from "@mui/material";

const Table = () => {
  const [getPlace, setGetPlace] = useState([]);
  const[searchKey,setSearchKey]=useState("")
      const[isLoading,setIsLoading]=useState(false)
  

  useEffect(() => {
    fetchPlaces();
  }, [searchKey]);

  const fetchPlaces = async (reqHeader) => {
    try {
      setIsLoading(true)
      const result = await getPlaceApi(searchKey,reqHeader);
      setGetPlace(result.data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  const handleDelete = async (id) => {
    try {
     const deletePlace =  await deletePlaceApi(id);
     if(deletePlace.status == 200){
      toast.error("Place Deleted successfully!");
      fetchPlaces();
     }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <>
      
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white">
        {/* Search Input */}
        <div className="pb-4 flex flex-col md:flex-row items-center md:justify-between">
          <label className="sr-only">Search</label>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <svg
                className="w-5  h-5 text-gray-500"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input onChange={e=>setSearchKey(e.target.value)}
              type="text"
              id="table-search"
              className="block w-full py-2 pl-10 placeholder-amber-500 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="  Search for places..."
            />
          </div>
        </div>
  
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Sl No</th>
                <th className="px-4 py-3">Place Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoading ? (
                  <tr>
                  <td colSpan="10" className="py-4 px-6">
                    <Box sx={{ width: "100%", p: 2 }}>
                      <Skeleton height={40} />
                      <Skeleton animation="wave" height={40} />
                      <Skeleton animation={false} height={40} />
                    </Box>
                  </td>
                </tr>
                ):
              
              getPlace?.length > 0 ? (
                getPlace.map((item, index) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {item.placeName}
                    </td>
                    <td className="px-4 py-3">
                      <p>{item.locationUrl}</p>
                    </td>
                    <td className="px-4 py-3">
                      <img
                        className="w-16 h-16 object-cover rounded-md"
                        src={`${serverurl}/uploads/${item.placeImg}`}
                        alt="Place"
                      />
                    </td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 flex flex-col md:flex-row md:items-center md:gap-4">
                      <Edit place={item} getPlace={fetchPlaces} />
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No place added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
   </>
  );
};

export default Table;

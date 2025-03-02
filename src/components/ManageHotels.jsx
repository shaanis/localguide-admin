import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addHotelApi, deleteHotelApi, getHotelApi } from '../services/allApi'
import serverurl from '../services/serverurl'
import {  toast } from 'react-toastify';
import Edithotel from './Edithotel';

  
const ManageHotels = () => {
  const notify = () => toast.error("Item has been deleted!");
  const[getHotel, setGetHotel]=useState("")
   const[preview, setPreview]=useState("")
   const[hotelDetails,setHotelDetails]=useState({
    hotelName:"",hotelImg:"",description:"",locationUrl:"",wifi:"",rate:""
   })
   const[imageFileStatus,setImageFileStatus]=useState(false)
     useEffect(()=>{
       if(hotelDetails.hotelImg.type == 'image/png' || hotelDetails.hotelImg.type == 'image/jpg' || hotelDetails.hotelImg.type == 'image/jpeg'){
           setImageFileStatus(false)
           setPreview(URL.createObjectURL(hotelDetails.hotelImg))
       }else{
         // invalid
         setImageFileStatus(true)
         setHotelDetails({...hotelDetails,hotelImg:""})
         setPreview("")
       }
     },[hotelDetails.hotelImg])
     useEffect(()=>{
      showHotel()
     },[])
 
   const [show, setShow] = useState(false);
  
    const handleClose = () => {
      setPreview("")
     
      setShow(false);
    }
    const handleShow = () => setShow(true);

    //add hotel
    const addHotel=async()=>{
      const {hotelName,hotelImg,description,locationUrl,wifi,rate}=hotelDetails
      const reqBody = new FormData()
      reqBody.append("hotelName",hotelName)
      reqBody.append("description",description)
      reqBody.append("locationUrl",locationUrl)
      reqBody.append("wifi",wifi)
      reqBody.append("rate",rate)
      reqBody.append("hotelImg",hotelImg)
      if(hotelName && hotelImg && description && locationUrl && wifi && rate){
       try{
        const result = await addHotelApi(reqBody,{ "Content-Type": "multipart/form-data" })
       if(result.status == 200){
        handleClose()
        toast.success("Hotel Added successfully!");
        setHotelDetails({
          hotelName:"",hotelImg:"",description:"",locationUrl:"",wifi:"",rate:""
         })
         showHotel()
       }
       }catch(e){
        console.log(e);
        
       }
      }
    }
    // show hotel
    const showHotel = async()=>{
     try{
      const result = await getHotelApi()
     if(result.status == 200){
      setGetHotel(result.data)
      console.log(result.data);
      
     }
     }catch(e){
      console.log(e);
      
     }
    }

    // delete hotel
    const removeHotel = async(id)=>{
     
      const deleteHotel = await deleteHotelApi(id)
      if(deleteHotel.status == 200){
        toast.error("Hotel deleted successfully!");
        showHotel()
      }
    }

    
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 ps-14 md:ps-0 lg:ps-0">Manage Hotels</h1>
      <button onClick={handleShow} className="mb-4 p-2 bg-blue-500 text-white rounded">Add New Hotel</button>
      <p>Hotel management table goes here...</p>

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
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {getHotel?.length > 0 ? (
              getHotel.map((item, index) => (
                <tr
                  key={item._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.hotelName}
                  </td>
                  <td className="px-4 py-3">
                    <p>{item.locationUrl}</p>
                  </td>
                  <td className="px-4 py-3">
                    <img
                      className="w-16 h-16 object-cover rounded-md"
                      src={`${serverurl}/uploads/${item.hotelImg}`}
                      alt="Place"
                    />
                  </td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.rate}</td>
                  <td className="px-4 py-3 flex flex-col md:flex-row md:items-center md:gap-4">
                    <Edithotel hotel={item}  editShowHotel={showHotel}/>
                    <button
                       onClick={() => removeHotel(item._id)}
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

   

 
    

 

      <>
      <Modal centered show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form  className="flex flex-col gap-5 p-4" encType="multipart/form-data">
            <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
            <label className='text-center'>
            <input  onChange={e=>setHotelDetails({...hotelDetails,hotelImg:e.target.files[0]})} type="file" style={{display:'none'}} />
              <img height={'200px'} width={"200px"} src= {preview? preview : "https://static.vecteezy.com/system/resources/thumbnails/026/631/445/small_2x/add-photo-icon-symbol-design-illustration-vector.jpg"} alt="" /> 
           
            </label>
            </div>
            {
              imageFileStatus && <div className='text-red-500 font-bold my-1'>* Upload only the following file types (jpeg, jpg, png) here!!</div>
            }
  
  
            <div className="flex flex-col gap-4 w-full">
              <input onChange={e=>setHotelDetails({...hotelDetails,hotelName:e.target.value})} value={hotelDetails.hotelName}
                placeholder="Enter place name"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <input onChange={e=>setHotelDetails({...hotelDetails,locationUrl:e.target.value})} value={hotelDetails.locationUrl}
                placeholder="Enter location URL"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <input onChange={e=>setHotelDetails({...hotelDetails,rate:e.target.value})} value={hotelDetails.rate}
                placeholder="Enter rate"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <Form.Select 
                  className="border border-gray-300 p-2 rounded-md w-full"  
                  aria-label="Wifi Availability"
                  value={hotelDetails.wifi} // Bind value to state
                  onChange={(e) => setHotelDetails({ ...hotelDetails, wifi: e.target.value })}
                >
                  <option className='w-10' value="">Wifi</option>
                  <option className='w-10' value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>

              <textarea maxLength={200} onChange={e=>setHotelDetails({...hotelDetails,description:e.target.value})} value={hotelDetails.description}
                placeholder="Enter description"
                className="border border-gray-300 p-2 rounded-md w-full h-32 resize-none"
              />
            </div>
          </form>
  
  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={addHotel} variant="primary" >
              +ADD
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  )
}

export default ManageHotels
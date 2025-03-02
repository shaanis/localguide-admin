import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Table from './Table';
import { addPlaceApi, getPlaceApi } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify';

const ManagePlaces = () => {
  
  const[preview,setPreview]=useState("")
  const [placeDetails,setPlaceDetails]=useState({
    placeName:"",
    locationUrl:"",
    description:"",
    placeImg:""
  })
  console.log(placeDetails);
  const[imageFileStatus,setImageFileStatus]=useState(false)
  useEffect(()=>{
    if(placeDetails.placeImg.type == 'image/png' || placeDetails.placeImg.type == 'image/jpg' || placeDetails.placeImg.type == 'image/jpeg'){
        setImageFileStatus(false)
        setPreview(URL.createObjectURL(placeDetails.placeImg))
    }else{
      // invalid
      setImageFileStatus(true)
      setPlaceDetails({...placeDetails,placeImg:""})
      setPreview("")
    }
  },[placeDetails.placeImg])
 
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setPreview("")
    setPlaceDetails({ placeName:"",
      locationUrl:"",
      description:"",
      placeImg:""})
      setImageFileStatus(false)
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleAddPlace = async () => {
    const { placeName, locationUrl, description, placeImg } = placeDetails;
    if (placeName && locationUrl && description && placeImg) {
      const reqBody = new FormData();
      reqBody.append("placeName", placeName);
      reqBody.append("locationUrl", locationUrl);
      reqBody.append("description", description);
      reqBody.append("placeImg", placeImg);
  
      try {
        const result = await addPlaceApi(reqBody, { "Content-Type": "multipart/form-data" });
  
        if (result.status === 201) { 
          toast.success("Place Added successfully!");
          handleClose(); // Close modal after success
        } else {
          alert("Adding failed!");
        }
      } catch (e) {
        console.log(e);
        alert("Server error! Please try again.");
      }
    } else {
      alert("Please fill all fields!");
    }
  };

 
  
  return (
    < >
      
        <h1 className="text-2xl font-bold mb-4 pt-10">Manage Places</h1>
        <button onClick={handleShow} className="mb-4 p-2 bg-blue-500 text-white rounded font-semibold">+Add New Place</button>
        <Table />
        
        <>
        <Modal centered show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Place</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="flex flex-col gap-5 p-4" encType="multipart/form-data">
            <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
            <label className='text-center'>
            <input  onChange={e=>setPlaceDetails({...placeDetails,placeImg:e.target.files[0]})} type="file" style={{display:'none'}} />
              <img height={'200px'} width={"200px"} src= {preview? preview : "https://static.vecteezy.com/system/resources/thumbnails/026/631/445/small_2x/add-photo-icon-symbol-design-illustration-vector.jpg"} alt="" /> 
           
            </label>
            </div>
            {
              imageFileStatus && <div className='text-red-500 font-bold my-1'>* Upload only the following file types (jpeg, jpg, png) here!!</div>
            }
  
  
            <div className="flex flex-col gap-4 w-full">
              <input onChange={e=>setPlaceDetails({...placeDetails,placeName:e.target.value})} value={placeDetails.placeName}
                placeholder="Enter place name"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <input onChange={e=>setPlaceDetails({...placeDetails,locationUrl:e.target.value})} value={placeDetails.locationUrl}
                placeholder="Enter location URL"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <textarea maxLength={200} onChange={e=>setPlaceDetails({...placeDetails,description:e.target.value})} value={placeDetails.description}
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
            <Button variant="primary" onClick={handleAddPlace}>
              +ADD
            </Button>
          </Modal.Footer>
        </Modal>
        </>
      
    </>
  )
}

export default ManagePlaces
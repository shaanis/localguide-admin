import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import serverurl from '../services/serverurl';
import { editHotelApi } from '../services/allApi';
import { toast } from 'react-toastify';

const Edithotel = ({hotel,editShowHotel}) => {
    const[hotelDetails,setHotelDetails]=useState({
        id:hotel._id,
        hotelName:hotel.hotelName, description:hotel.description, wifi:hotel.wifi, locationUrl:hotel.locationUrl, rate:hotel.rate, hotelImg:hotel.hotelImg
      })
      const [preview, setPreview] = useState(`${serverurl}/uploads/${hotel.hotelImg}`);
      const [imageFileStatus, setImageFileStatus] = useState(false);
      const [show, setShow] = useState(false);

    
      // Handle file input and preview
      useEffect(() => {
        if (hotelDetails.placeImg && typeof hotelDetails.hotelImg === "object") {
          // ✅ Check if a new image is selected
          if (
            hotelDetails.hotelImg.type === "image/png" ||
            hotelDetails.hotelImg.type === "image/jpg" ||
            hotelDetails.hotelImg.type === "image/jpeg"
          ) {
            setImageFileStatus(false);
            setPreview(URL.createObjectURL(hotelDetails.hotelImg));
          } else {
            setImageFileStatus(true);
            setHotelDetails({ ...hotelDetails, hotelImg: "" });
            setPreview("");
          }
        }
      }, [hotelDetails.placeImg]);
      const handleShow = () => {
        setHotelDetails({
            id:hotel._id,
            hotelName:hotel.hotelName, 
            description:hotel.description,
             wifi:hotel.wifi,
              locationUrl:hotel.locationUrl,
               rate:hotel.rate, 
               hotelImg:hotel.hotelImg
        });
        setPreview(`${serverurl}/uploads/${hotel.hotelImg}`); // ✅ Preserve image preview
        setShow(true);
      };
    
      // Close modal and reset fields
      const handleClose = () => {
        setHotelDetails({
            id:hotel._id,
            hotelName:hotel.hotelName, 
            description:hotel.description,
             wifi:hotel.wifi,
              locationUrl:hotel.locationUrl,
               rate:hotel.rate, 
               hotelImg:hotel.hotelImg
        });
        setPreview(`${serverurl}/uploads/${hotel.hotelImg}`);
        setShow(false);
      };
      const handleUpdate=async()=>{
        const {id,hotelName, description, wifi, locationUrl, rate, hotelImg} =hotelDetails
        if(id,hotelName, description, wifi, locationUrl, rate, hotelImg){
          const reqBody= new FormData()
          reqBody.append("hotelName",hotelName)
          reqBody.append("description",description)
          reqBody.append("locationUrl",locationUrl)
          reqBody.append("wifi",wifi)
          reqBody.append("rate",rate)
          if (typeof hotelImg === "object") {
            reqBody.append("hotelImg", hotelImg); // ✅ If new image is selected
          }
          const reqHeader={
            "Content-Type":"multipart/form-data"
        }
        try{
          const result = await editHotelApi(id,reqBody,reqHeader)
          if (result.status === 200) {
                    toast.success("Updated Successfully");
                    handleClose();
                    editShowHotel();
                  }else{
                    toast.error("Updated failed");
                  }
        }catch(e){
          console.log(e);
          
        }
        }
        
        
      }
  return (
    <div>
    <button className='font-bold text-green-600' onClick={handleShow}>Edit</button>
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
        <Button onClick={handleUpdate} variant="primary" >
          +ADD
        </Button>
      </Modal.Footer>
    </Modal>
</div>
  )
}

export default Edithotel
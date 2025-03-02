
const Modal = ({hotel}) => {
  
 
  return (
    <div>
        <button onClick={handleShow}>Edit</button>
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
    </div>
  )
}

export default Modal
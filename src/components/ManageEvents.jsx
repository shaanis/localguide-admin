import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { addEventsApi, deleteEventsApi, showEventsApi } from "../services/allApi";
import { toast } from "react-toastify";
import serverurl from "../services/serverurl";
import DeleteModal from "./DeleteModal";
import { Box, Skeleton } from "@mui/material";

const ManageEvents = () => {
  const[isLoading,setIsLoading]=useState(false)
  const[eventLoading,setEventLoading]=useState(false)
  const [preview, setPreview] = useState("");
  const [getEvent, setGetEvent] = useState("");
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    location: "",
    description: "",
    image: "",
    time: "",
    ticketPrice: "",
    availableTickets: "",
    date: "",
  });
  // console.log(placeDetails);
  const [imageFileStatus, setImageFileStatus] = useState(false);
  useEffect(() => {
    if (
      eventDetails.image.type == "image/png" ||
      eventDetails.image.type == "image/jpg" ||
      eventDetails.image.type == "image/jpeg"
    ) {
      setImageFileStatus(false);
      setPreview(URL.createObjectURL(eventDetails.image));
    } else {
      // invalid
      setImageFileStatus(true);
      setEventDetails({ ...eventDetails, image: "" });
      setPreview("");
    }
  }, [eventDetails.image]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setPreview("");
    setEventDetails({
      eventName: "",
      location: "",
      description: "",
      image: "",
      time: "",
      ticketPrice: "",
      availableTickets: "",
      date: "",
    });
    setImageFileStatus(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const addEvents = async () => {
    const {
      eventName,
      location,
      description,
      time,
      image,
      ticketPrice,
      availableTickets,
      date,
    } = eventDetails;
    const reqBody = new FormData();
    reqBody.append("eventName", eventName);
    reqBody.append("location", location);
    reqBody.append("description", description);
    reqBody.append("time", time);
    reqBody.append("date", date);
    reqBody.append("ticketPrice", ticketPrice);
    reqBody.append("availableTickets", availableTickets);
    reqBody.append("image", image);
    const reqHeader = {
      "Content-Type": "multipart/form-data",
    };
    if (
      eventName &&
      location &&
      description &&
      time &&
      image &&
      ticketPrice &&
      availableTickets &&
      date
    ) {
      try{
        setIsLoading(true)
        const result = await addEventsApi(reqBody, reqHeader);
      
      if (result.status == 200) {
        toast.success("Event added!!");
        handleClose();
        getAllEvents();
      }
    }catch(e){
      console.log(e);
      
    }finally{
      setIsLoading(false)
      handleClose();
    }
      }
  };

  useEffect(() => {
    getAllEvents();
  }, []);
  // show all events
  const getAllEvents = async () => {
    try {
      setEventLoading(true); // Ensure loading state is set before the request
      const result = await showEventsApi();
  
      if (result.status === 200) {
        setGetEvent(result.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setEventLoading(false); // Ensure loading is disabled after request completes
    }
  };
  
  // delete event
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      <button
        onClick={handleShow}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Event
      </button>
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
            <input
              onChange={(e) => setSearchKey(e.target.value)}
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
                <th className="px-4 py-3">Event Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Available Tickets</th>
                <th className="px-4 py-3">price</th>
                <th className="px-4 py-3">date</th>
                <th className="px-4 py-3">time</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
  {eventLoading ? (
    <tr>
    <td colSpan="10" className="py-4 px-6">
      <Box sx={{ width: "100%", p: 2 }}>
        <Skeleton height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation={false} height={40} />
      </Box>
    </td>
  </tr>
  ) : getEvent?.length > 0 ? (
    [...getEvent]
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date (ascending)
      .sort((a, b) => (new Date(a.date) < new Date() ? 1 : -1)) // Push expired to the bottom
      .map((item, index) => (
        <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
          <td className="px-4 py-3">{index + 1}</td>
          <td className="px-4 py-3 font-medium text-gray-900">{item.eventName}</td>
          <td className="px-4 py-3">{item.location}</td>
          <td className="px-4 py-3">
            <img
              className="w-16 h-16 object-cover rounded-md"
              src={`${serverurl}/uploads/${item.image}`}
              alt="Event"
            />
          </td>
          <td className="px-4 py-3">{item.description}</td>
          <td
            className={`px-4 py-3 ${
              item.availableTickets > 0 ? "text-black" : "text-red-500 font-bold"
            }`}
          >
            {item.availableTickets > 0 ? item.availableTickets : "Sold Out"}
          </td>
          <td className="px-4 py-3">{item.ticketPrice}</td>
          <td className="px-4 py-3">
            {new Date(item.date) < new Date() ? (
              <span className="text-red-500 font-bold">Expired</span>
            ) : (
              item.date
            )}
          </td>
          <td className="px-4 py-3">{item.time}</td>
          <td className="px-4 py-3 flex flex-col md:flex-row md:items-center md:gap-4">
            <DeleteModal Event={item} allEvents={getAllEvents} />
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="10" className="text-center py-4 text-gray-500">
        No events found.
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>
      </div>

      <>
        <Modal  centered show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-5 p-4"
              encType="multipart/form-data"
            >
              <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
                <label className="text-center">
                  <input
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        image: e.target.files[0],
                      })
                    }
                    type="file"
                    style={{ display: "none" }}
                  />
                  <img
                    height={"200px"}
                    width={"200px"}
                    src={
                      preview
                        ? preview
                        : "https://static.vecteezy.com/system/resources/thumbnails/026/631/445/small_2x/add-photo-icon-symbol-design-illustration-vector.jpg"
                    }
                    alt=""
                  />
                </label>
              </div>
              {imageFileStatus && (
                <div className="text-red-500 font-bold my-1">
                  * Upload only the following file types (jpeg, jpg, png) here!!
                </div>
              )}

              <div className="flex flex-col gap-4 w-full">
                <input
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      eventName: e.target.value,
                    })
                  }
                  value={eventDetails.eventName}
                  placeholder="Enter place name"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="text"
                />
                <input
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      location: e.target.value,
                    })
                  }
                  value={eventDetails.location}
                  placeholder="Enter location URL"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="text"
                />
                <input
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      availableTickets: e.target.value,
                    })
                  }
                  value={eventDetails.availableTickets}
                  placeholder="Enter total seats"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="text"
                />
                <input
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, time: e.target.value })
                  }
                  value={eventDetails.time}
                  placeholder="Enter event timing"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="time"
                />
                <input
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, date: e.target.value })
                  }
                  value={eventDetails.date}
                  placeholder="Enter event date"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="date"
                />
                <input
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      ticketPrice: e.target.value,
                    })
                  }
                  value={eventDetails.ticketPrice}
                  placeholder="Enter ticket price"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="text"
                />
               

                <textarea
                  maxLength={200}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      description: e.target.value,
                    })
                  }
                  value={eventDetails.description}
                  placeholder="Enter description"
                  className="border border-gray-300 p-2 rounded-md w-full h-32 resize-none"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isLoading} variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={isLoading} onClick={addEvents} variant="primary">
            {isLoading ? <Spinner className="text-danger" animation="border" size="sm" /> : "+ADD"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default ManageEvents;

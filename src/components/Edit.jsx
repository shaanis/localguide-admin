import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import serverurl from "../services/serverurl";
import { updatePlaceApi } from "../services/allApi";
import { toast } from "react-toastify";

const Edit = ({ place, getPlace }) => {
  const [editPlace, setEditPlace] = useState({
    id: place._id,
    placeName: place.placeName,
    placeImg: place.placeImg, // ✅ Preserve existing image
    locationUrl: place.locationUrl,
    description: place.description,
  });

  const [preview, setPreview] = useState(`${serverurl}/uploads/${place.placeImg}`);
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [show, setShow] = useState(false);

  // Handle file input and preview
  useEffect(() => {
    if (editPlace.placeImg && typeof editPlace.placeImg === "object") {
      // ✅ Check if a new image is selected
      if (
        editPlace.placeImg.type === "image/png" ||
        editPlace.placeImg.type === "image/jpg" ||
        editPlace.placeImg.type === "image/jpeg"
      ) {
        setImageFileStatus(false);
        setPreview(URL.createObjectURL(editPlace.placeImg));
      } else {
        setImageFileStatus(true);
        setEditPlace({ ...editPlace, placeImg: "" });
        setPreview("");
      }
    }
  }, [editPlace.placeImg]);

  // Open modal and set initial values
  const handleShow = () => {
    setEditPlace({
      id: place._id,
      placeName: place.placeName,
      placeImg: place.placeImg, // ✅ Keep existing image
      locationUrl: place.locationUrl,
      description: place.description,
    });
    setPreview(`${serverurl}/uploads/${place.placeImg}`); // ✅ Preserve image preview
    setShow(true);
  };

  // Close modal and reset fields
  const handleClose = () => {
    setEditPlace({
      id: place._id,
      placeName: place.placeName,
      placeImg: place.placeImg,
      locationUrl: place.locationUrl,
      description: place.description,
    });
    setPreview(`${serverurl}/uploads/${place.placeImg}`);
    setShow(false);
  };

  // Handle update
  const handleUpdate = async () => {
    const { placeName, placeImg, description, locationUrl, id } = editPlace;

    if (placeName && description && locationUrl) {
      const reqBody = new FormData();
      reqBody.append("placeName", placeName);
      reqBody.append("locationUrl", locationUrl);
      reqBody.append("description", description);

      if (typeof placeImg === "object") {
        reqBody.append("placeImg", placeImg); // ✅ If new image is selected
      }

      const reqHeader = {
        "Content-Type": "multipart/form-data",
      };

      try {
        const result = await updatePlaceApi(id, reqBody, reqHeader);
        if (result.status === 200) {
          toast.success("Updated Successfully");
          handleClose();
          getPlace();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please fill in all fields completely.");
    }
  };

  return (
    <>
      <button onClick={handleShow}>Edit</button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Place Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-5 p-4">
            <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
              <label className="text-center">
                <input
                  onChange={(e) => setEditPlace({ ...editPlace, placeImg: e.target.files[0] })}
                  type="file"
                  style={{ display: "none" }}
                />
                <img
                  height="200px"
                  width="200px"
                  src={preview}
                  alt="Place Preview"
                  className="rounded-md shadow"
                />
              </label>
            </div>
            {imageFileStatus && (
              <div className="text-red-500 font-bold my-1">
                * Upload only jpeg, jpg, or png files!
              </div>
            )}

            <div className="flex flex-col gap-4 w-full">
              <input
                onChange={(e) => setEditPlace({ ...editPlace, placeName: e.target.value })}
                value={editPlace.placeName}
                placeholder="Enter place name"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <input
                onChange={(e) => setEditPlace({ ...editPlace, locationUrl: e.target.value })}
                value={editPlace.locationUrl}
                placeholder="Enter location URL"
                className="border border-gray-300 p-2 rounded-md w-full"
                type="text"
              />
              <textarea
                onChange={(e) => setEditPlace({ ...editPlace, description: e.target.value })}
                value={editPlace.description}
                placeholder="Enter description"
                className="border border-gray-300 p-2 rounded-md w-full h-32 resize-none"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;

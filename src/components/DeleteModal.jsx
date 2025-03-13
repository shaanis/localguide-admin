import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteEventsApi } from '../services/allApi';

const DeleteModal = ({ Event,allEvents }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const deleteEvents=async(id)=>{
        try {const result = await deleteEventsApi(id)
        if(result.status==200){
            allEvents()
        }}catch(e){
          console.log(e);
          
        }
      }

    return (
        <>
            <button onClick={handleOpen} className="btn text-danger">
                Delete
            </button>
                <Modal   show={show} onHide={handleClose} centered>
                    
                        
                           <div className='flex flex-col justify-center items-center w-full pt-4'>
                             {/* <p className='text-center text-red-600'>Confirm Deletion </p> */}
                             <i className="fa-solid fa-trash-can text-danger  p-3 bg-gray-200 rounded-full"></i>
                             </div>
                    
                       <div className='w-full flex justify-center items-center p-3 text-center'> <p className='mx-4'>Are you sure you want to delete this item? This action cannot be undone.</p></div>
                    
                    <div className='flex justify-center items-center gap-4 py-4'>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => deleteEvents(Event._id)}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            
        </>
    );
};

export default DeleteModal;

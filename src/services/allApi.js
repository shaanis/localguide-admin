import commonAPI from "./commonAPI"
import serverurl from "./serverurl"

export const loginApi = async(reqBody)=>{
  return await commonAPI("POST",`${serverurl}/login`,reqBody)
}

 export const getAllUserApi = async()=>{
  return await commonAPI("GET",`${serverurl}/users`)
 }

//  delete user
 export const deleteUserApi= async(id)=>{
    return await commonAPI("DELETE",`${serverurl}/${id}/remove`,{})
 }

//   add place
 export const addPlaceApi =async(reqBody,reqHeader)=>{
   return await commonAPI("POST",`${serverurl}/places`,reqBody,reqHeader)
 }
//   get place
 export const getPlaceApi =async(searchKey,reqHeader)=>{
   return await commonAPI("GET",`${serverurl}/get-places?search=${searchKey}`,{},reqHeader)
 }
//   delete place
 export const deletePlaceApi =async(id)=>{
   return await commonAPI("DELETE",`${serverurl}/${id}/removePlace`)
 }
//   Edit place
 export const updatePlaceApi =async(id,reqHeader,reqBody)=>{
   return await commonAPI("PUT",`${serverurl}/${id}/edit-places`,reqHeader,reqBody)
 }


 //   get place count for dashboard
 export const getPlaceCountApi =async()=>{
  return await commonAPI("GET",`${serverurl}/dash-places`,{})
}
 //   add hotel 
 export const addHotelApi =async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${serverurl}/add-hotel`,reqBody,reqHeader)
}
 //   get hotel details 
 export const getHotelApi =async()=>{
  return await commonAPI("GET",`${serverurl}/get-hotel`,{})
}
 //   delete hotel details 
 export const deleteHotelApi =async(id)=>{
  return await commonAPI("DELETE",`${serverurl}/${id}/remove-hotel`,{})
}
 //   edit hotel details 
 export const editHotelApi =async(id,reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${serverurl}/${id}/edit-hotel`,reqBody,reqHeader)
}
// add events
 export const addEventsApi =async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${serverurl}/add-event`,reqBody,reqHeader)
}
// show events
 export const showEventsApi =async()=>{
  return await commonAPI("GET",`${serverurl}/events`,{})
}
// show bookings
 export const showBookingsApi =async(searchKey)=>{
  return await commonAPI("GET",`${serverurl}/all-booking?search=${searchKey}`,{})
}
// delete events
 export const deleteEventsApi =async(id)=>{
  return await commonAPI("GET",`${serverurl}/${id}/remove-event`,{})
}

// get all pending bookings
 export const getAllPendingBookingApi =async()=>{
  return await commonAPI("GET",`${serverurl}/booking-pendings`,{})
}
// update booking status
 export const updatePendingBookingApi =async(id,status)=>{
  return await commonAPI("PUT",`${serverurl}/booking/${id}/update?status=${status}`,{})
}




 
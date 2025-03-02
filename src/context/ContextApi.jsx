import React, { createContext, useState } from 'react'

export const getPlaceContext = createContext()

const ContextApi = ({children}) => {
    const [getGlobalPlace,setGlobalGetPlace]=useState("")
  return (
    <getPlaceContext.Provider value={{getGlobalPlace,setGlobalGetPlace}}>
       {children}
    </getPlaceContext.Provider>
  )
}

export default ContextApi
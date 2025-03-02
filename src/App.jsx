
import { ToastContainer } from 'react-toastify'
import './App.css'
import AdminPanel from './pages/AdminPanel'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'


function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      
        <Routes >
            <Route path='/' element={<Login/>}></Route>
            <Route path='/admin-panel' element={<AdminPanel/>}></Route>
        </Routes>
      
    </>
  )
}

export default App

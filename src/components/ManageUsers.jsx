import React, { useEffect, useState } from 'react'
import { deleteUserApi, getAllUserApi } from '../services/allApi'
import { Trash2 } from "lucide-react";

const ManageUsers = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  // Fetch Users
  const getUser = async () => {
    try {
      const result = await getAllUserApi()
      if (result?.status === 200) {
        setUser(result.data)
      } else {
        console.error("Failed to fetch users:", result)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  // Delete User
  const deleteUser = async (id) => {

    try {
        const result = await deleteUserApi(id);

        if (result.status== 200) {
            alert("User deleted successfully");
            getUser(); // Refresh the list
        } else {
            console.error("Failed to delete user:", result);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};


  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-5">User Table</h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white rounded-md shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Password</th>
                <th className="p-3">id</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((users, index) => (
                <tr
                  key={users._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-200 transition`}
                >
                  <td className="p-3 text-center">{users.username}</td>
                  <td className="p-3 text-center">{users.email}</td>
                  <td className="p-3 text-center">{users.password}</td>
                  <td className="p-3 text-center">{users._id}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteUser(users?._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers

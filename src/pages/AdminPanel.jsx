import React, { useEffect, useState, useRef } from "react";
import Dashboard from "../components/Dashboard";
import ManagePlaces from "../components/ManagePlaces";
import ManageHotels from "../components/ManageHotels";
import ManageEvents from "../components/ManageEvents";
import ManageUsers from "../components/ManageUsers";
import Settings from "../components/Settings";
import Sidebar from "../components/Sidebar";
import Bookings from "../components/Bookings";

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  // const socketRef = useRef(null);

  // useEffect(() => {
  //   let reconnectAttempts = 0;

  //   const connectWebSocket = () => {
  //     if (socketRef.current) return; // Prevent multiple connections

  //     console.log("🔄 Connecting WebSocket...");
  //     const socket = new WebSocket("ws://localhost:8080");

  //     socket.onopen = () => {
  //       console.log("✅ Admin WebSocket connected");
  //       socket.send(JSON.stringify({ role: "admin" }));
  //       reconnectAttempts = 0; // Reset attempts
  //     };

  //     socket.onmessage = (event) => {
  //       const notification = JSON.parse(event.data);
  //       console.log("📩 New Notification:", notification);

  //       // Display normal alert notification
  //       alert(`📢 ${notification.title} - ${notification.message}`);
  //     };

  //     socket.onclose = (event) => {
  //       console.log(`⚠️ WebSocket disconnected (Code: ${event.code}). Reconnecting...`);
  //       socketRef.current = null; // Reset socket reference
  //       reconnectAttempts++;
  //       setTimeout(connectWebSocket, Math.min(5000, reconnectAttempts * 1000));
  //     };

  //     socket.onerror = (error) => {
  //       console.error("❌ WebSocket error:", error);
  //       socket.close();
  //     };

  //     socketRef.current = socket;
  //   };

  //   connectWebSocket();

  //   return () => {
  //     if (socketRef.current) {
  //       console.log("Closing WebSocket...");
  //       socketRef.current.close();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (selectedTab === "bookings") {
     
  //   }
  // }, [selectedTab]);



  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed on the left */}
      <Sidebar setSelectedTab={setSelectedTab} />

      {/* Main content - Scrollable when overflowing */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {selectedTab === "dashboard" && <Dashboard />}
        {selectedTab === "places" && <ManagePlaces />}
        {selectedTab === "hotels" && <ManageHotels />}
        {selectedTab === "events" && <ManageEvents />}
        {selectedTab === "bookings" && <Bookings />}
        {selectedTab === "users" && <ManageUsers />}
        {selectedTab === "settings" && <Settings />}
      </main>
      
    </div>
  );
};

export default AdminPanel;

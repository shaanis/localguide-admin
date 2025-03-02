import { useState } from "react";
import { 
  FaMapMarkerAlt, FaUsers, FaCogs, FaChartPie, 
  FaHotel, FaCalendarAlt, FaBars, FaTimes 
} from "react-icons/fa";

const Sidebar = ({ setSelectedTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-5  left-5 text-white bg-gray-900 p-3 rounded z-50"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-5 w-64 md:w-72 
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative transition-transform duration-300 ease-in-out 
          shadow-lg z-50`}
      >
        {/* Close Button (Only for Mobile) */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white p-2 md:hidden"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar Items */}
        <nav className="flex flex-col gap-4">
          {[
            { label: "Dashboard", icon: <FaChartPie />, tab: "dashboard" },
            { label: "Manage Places", icon: <FaMapMarkerAlt />, tab: "places" },
            { label: "Manage Hotels", icon: <FaHotel />, tab: "hotels" },
            { label: "Manage Events", icon: <FaCalendarAlt />, tab: "events" },
            { label: "Bookings", icon: <FaCalendarAlt />, tab: "bookings" },
            { label: "Users", icon: <FaUsers />, tab: "users" },
            { label: "Settings", icon: <FaCogs />, tab: "settings" },
          ].map(({ label, icon, tab }) => (
            <button 
              key={tab}
              onClick={() => { setSelectedTab(tab); setIsOpen(false); }} 
              className="p-3 hover:bg-gray-700 rounded flex items-center gap-3 transition-all"
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

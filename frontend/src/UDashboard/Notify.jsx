import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { deletenotify } from "../api/notification";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../api/notification";
import Swal from "sweetalert2";
import {
  Bell,
  CheckCheck,
} from "lucide-react";

const Notify = () => {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete=async(id)=>{
    try{
          const res=await deletenotify(id);
            Swal.fire({
              icon:"success",
              title:"deleted successfully",
              text:res.data?.message
            })

    }
    catch(err){
              Swal.fire({
              icon:"error",
              title:"delete failed",
              text:err.response?.data?.message || err.message
            })
    }
  }
  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(
        res.notifications || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col overflow-hidden">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 md:px-8 py-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          
          <div>
            <div className="flex items-center gap-3">
              
              <div className="relative">
                <Bell
                  size={28}
                  className="text-gray-800"
                />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                    {unreadCount}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-800">
                Notifications
              </h1>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Stay updated with recent activity
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={handleMarkAll}
              className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition w-full md:w-auto"
            >
              <CheckCheck size={18} />
              Mark all read
            </button>
          )}
        </div>

        {/* NOTIFICATION CONTAINER */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell
                  size={40}
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-5 text-lg font-medium">
                No notifications yet
              </p>

              <p className="text-sm mt-1">
                You're all caught up
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  handleRead(item._id)
                }
                className={`flex items-start gap-4 p-5 border-b border-gray-100 cursor-pointer transition duration-200 hover:bg-gray-50 ${
                  !item.isRead
                    ? "bg-green-50/40"
                    : "bg-white"
                }`}
              >
                
                {/* ICON */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    !item.isRead
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Bell
                    size={18}
                    className={
                      !item.isRead
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  />
                </div>

                {/* MESSAGE */}
                <div className="flex-1">
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                    {item.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* UNREAD DOT */}
                {!item.isRead && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-2"></div>
                )}

                {/* delete button */}
                <button className="bg-red-500 text-white  font-bold  hover:bg-red-300 p-2 rounded-lg" onClick={()=>{handleDelete(item._id)}}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notify;
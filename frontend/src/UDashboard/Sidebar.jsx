import { useState, useEffect } from "react";
import {
  RiDashboardLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowLeftLine,
} from "@remixicon/react";

import { Bell } from "lucide-react";
import { useNavigate } from "react-router";

import swal from "sweetalert2";
import Swal from "sweetalert2";

import { logOut } from "../api/auth";
import { getNotifications } from "../api/notification";

import { useAuth } from "../state/AuthState";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();

      const notifications =
        res.notifications || [];

      const unread =
        notifications.filter(
          (item) => !item.isRead
        ).length;

      setUnreadCount(unread);
    } catch (err) {
      console.log(err);
    }
  };

  function handleClick() {
    navigate("/login/userdashboard");
  }

  const handleLogout = () => {
    if (
      !user &&
      !localStorage.getItem("token")
    ) {
      Swal.fire({
        title: "Not logged in",
        text: "You are already logged out.",
        icon: "info",
      });

      return;
    }

    Swal.fire({
      title: "Are You Sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logOut();

          setUser(null);

          localStorage.removeItem("token");

          Swal.fire({
            title: "Logged out!",
            text: "You have been successfully logged out.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } catch (err) {
          swal.fire({
            title: "Error!",
            text: "Logout failed, Try again",
            icon: "error",
          });
        }
      }
    });
  };

  if (!user) return null;

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="bg-green-700 w-screen p-5 flex items-center justify-between text-white">
        
        {/* LEFT */}
        <div className="flex gap-2 items-center">
          
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="bg-green-700 hover:bg-green-600 p-1 rounded"
          >
            <RiArrowLeftLine
              color="rgba(255,255,255,1)"
            />
          </button>

          <h1 className="text-lg md:text-xl font-bold">
            FarmKart
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-lg">
          
          {/* DASHBOARD */}
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <RiDashboardLine />

            <button onClick={handleClick}>
              Dashboard
            </button>
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <RiUserLine />

            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </button>
          </div>

          {/* NOTIFICATION */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/notify");
            }}
          >
            <div className="relative">
              
              <Bell />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </div>

            <span>Notification</span>
          </div>

          {/* LOGOUT */}
          <div className="flex items-center gap-2 hover:underline">
            <RiLogoutBoxLine />

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden text-2xl cursor-pointer">
          {open ? (
            <RiCloseLine
              onClick={() =>
                setOpen(false)
              }
            />
          ) : (
            <RiMenuLine
              onClick={() =>
                setOpen(true)
              }
            />
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-green-600 text-white flex flex-col gap-4 p-4 text-lg">
          
          {/* DASHBOARD */}
          <div className="flex items-center gap-2 cursor-pointer">
            <RiDashboardLine />

            <button onClick={handleClick}>
              Dashboard
            </button>
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-2 cursor-pointer">
            <RiUserLine />

            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </button>
          </div>

          {/* NOTIFICATION */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/notify");
            }}
          >
            <div className="relative">
              
              <Bell />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </div>

            <span>Notification</span>
          </div>

          {/* LOGOUT */}
          <div className="flex items-center gap-2 cursor-pointer">
            <RiLogoutBoxLine />

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
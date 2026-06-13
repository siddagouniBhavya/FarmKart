import {
  Users,
  Tractor,
  ShoppingCart,
  ArrowUpRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { logOut } from "../api/auth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";

const AdminSidebar = ({ active }) => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] =
    useState(false);

  const handleLogout = async () => {
    try {
      await logOut();

      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonColor: "#16a34a",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Logout Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });

      console.log(err.message);
    }
  };

  return (
    <div className="w-full bg-green-700 text-white shadow-md sticky top-0 z-50">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            FarmKart
          </h1>

          <p className="text-sm text-green-100">
            Admin Panel
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dashboard */}
          <button
            onClick={() =>
              navigate("/Adashboard")
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              active === "dashboard"
                ? "bg-white text-green-700 font-semibold"
                : "hover:bg-green-600"
            }`}
          >
            <ArrowUpRight size={18} />
            Dashboard
          </button>

          {/* Users */}
          <button
            onClick={() =>
              navigate("/admin/users")
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              active === "users"
                ? "bg-white text-green-700 font-semibold"
                : "hover:bg-green-600"
            }`}
          >
            <Users size={18} />
            Users
          </button>

          {/* Equipments */}
          <button
            onClick={() =>
              navigate(
                "/admin/equipments"
              )
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              active === "equipments"
                ? "bg-white text-green-700 font-semibold"
                : "hover:bg-green-600"
            }`}
          >
            <Tractor size={18} />
            Equipments
          </button>

          {/* Orders */}
          <button
            onClick={() =>
              navigate("/admin/orders")
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              active === "orders"
                ? "bg-white text-green-700 font-semibold"
                : "hover:bg-green-600"
            }`}
          >
            <ShoppingCart size={18} />
            Orders
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white bg-green-700 px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setOpenMenu(!openMenu)
          }
          className="md:hidden"
        >
          {openMenu ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {openMenu && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-green-700">
          <button
            onClick={() => {
              navigate("/Adashboard");
              setOpenMenu(false);
            }}
            className="flex items-center gap-2 bg-green-600 px-4 py-3 rounded-xl"
          >
            <ArrowUpRight size={18} />
            Dashboard
          </button>

          <button
            onClick={() => {
              navigate("/admin/users");
              setOpenMenu(false);
            }}
            className="flex items-center gap-2 bg-green-600 px-4 py-3 rounded-xl"
          >
            <Users size={18} />
            Users
          </button>

          <button
            onClick={() => {
              navigate(
                "/admin/equipments"
              );
              setOpenMenu(false);
            }}
            className="flex items-center gap-2 bg-green-600 px-4 py-3 rounded-xl"
          >
            <Tractor size={18} />
            Equipments
          </button>

          <button
            onClick={() => {
              navigate("/admin/orders");
              setOpenMenu(false);
            }}
            className="flex items-center gap-2 bg-green-600 px-4 py-3 rounded-xl"
          >
            <ShoppingCart size={18} />
            Orders
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-white text-green-700 px-4 py-3 rounded-xl font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
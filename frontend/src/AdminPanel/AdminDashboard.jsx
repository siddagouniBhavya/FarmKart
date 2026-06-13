import {
  CheckCircle,
  Menu,
  X,
  ShoppingCart,
  Users,
  Tractor,
} from "lucide-react";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import AdminSidebar from "./AdminSidebar";

import {
  dashboardAdmin,
  getLatestOrders,
  getRecentNotifications,
} from "../api/admin";

import { logOut } from "../api/auth";

import Swal from "sweetalert2";

const AdminDashboard = () => {

  const [openMenu, setOpenMenu] =
    useState(false);

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalEquipments: 0,
      totalOrders: 0,
    });

  const [latestOrders, setLatestOrders] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      try {

        const statsRes =
          await dashboardAdmin();

        const ordersRes =
          await getLatestOrders();

        const notifyRes =
          await getRecentNotifications();

        setStats(statsRes);

        // only latest 4 orders
        setLatestOrders(
          ordersRes.latestOrders
            ?.slice(0, 4)
        );

        setNotifications(
          notifyRes.notifications
        );

      } catch (err) {

        console.log(err.message);

      }
    };

    fetchData();

  }, []);

  // logout
  const handleLogout = async () => {

    try {

      await logOut();

      Swal.fire({
        title: "Logged Out!",
        text:
          "You have been logged out successfully.",
        icon: "success",
        confirmButtonColor:
          "#16a34a",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");

    } catch (err) {

      Swal.fire({
        title: "Logout Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor:
          "#dc2626",
      });

      console.log(err.message);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar active="dashboard" />

      {/* Main Content */}
      <div className="flex-1 w-full overflow-hidden">

        {/* Topbar */}
        <div className="bg-white px-4 md:px-6 py-4 shadow-sm flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="md:hidden bg-green-100 p-2 rounded-lg"
            >

              {openMenu ? (
                <X
                  className="text-green-700"
                  size={22}
                />
              ) : (
                <Menu
                  className="text-green-700"
                  size={22}
                />
              )}

            </button>

            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Dashboard
              </h2>

              <p className="text-gray-500 text-sm md:text-base">
                Welcome back, Admin
              </p>

            </div>
          </div>

          {/* Right */}
          <div className="hidden sm:block bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
            FarmKart Admin
          </div>
        </div>

        {/* Mobile Dropdown */}
        {openMenu && (

          <div className="md:hidden bg-white shadow-md mx-4 mt-4 rounded-2xl p-4 space-y-3">

            <button className="w-full bg-green-100 text-green-700 flex items-center gap-3 px-4 py-3 rounded-xl font-semibold">
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/admin/users")
              }
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Users
            </button>

            <button
              onClick={() =>
                navigate(
                  "/admin/equipments"
                )
              }
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Equipments
            </button>

            <button
              onClick={() =>
                navigate("/admin/orders")
              }
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Orders
            </button>

            <button
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* Users */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition" onClick={()=>{navigate("/admin/users")}}>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Users
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-3">
                    {stats.totalUsers}
                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                  <Users
                    className="text-green-700"
                    size={28}
                  />

                </div>
              </div>
            </div>

            {/* Equipments */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition" onClick={()=>{navigate("/admin/equipments")}}>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Equipments
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-3">
                    {stats.totalEquipments}
                  </h2>

                </div>

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <Tractor
                    className="text-yellow-700"
                    size={28}
                  />

                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition"onClick={()=>{navigate("/admin/orders")}}>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Orders
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-3">
                    {stats.totalOrders}
                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <ShoppingCart
                    className="text-blue-700"
                    size={28}
                  />

                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-3xl p-5 md:p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Recent Activity
              </h2>

            </div>

            {/* Activities */}
            <div className="space-y-5">

              {notifications.length > 0 ? (

                notifications
                  .slice(0, 4)
                  .map((item) => (

                    <div
                      key={item._id}
                      className="flex items-start gap-4"
                    >

                      {/* Icon */}
                      <div className="bg-green-100 p-2 rounded-full">

                        <CheckCircle
                          className="text-green-700"
                          size={18}
                        />

                      </div>

                      {/* Content */}
                      <div>

                        <p className="font-medium text-gray-800">
                          {item.message}
                        </p>

                        <p className="text-sm text-gray-500">
                          {
                            new Date(
                              item.createdAt
                            ).toLocaleString()
                          }
                        </p>

                      </div>

                    </div>
                  ))

              ) : (

                <p className="text-gray-500">
                  No recent activity
                </p>

              )}
            </div>
          </div>

          {/* Latest Orders */}
          <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-xl font-bold mb-5">
              Latest Orders
            </h2>

            <div className="space-y-4">

              {latestOrders.length > 0 ? (

                latestOrders.map((order) => (

                  <div
                    key={order._id}
                    className="flex items-center justify-between border-b pb-3"
                  >

                    <div>

                      <p className="font-medium">
                        {
                          order
                            .equipmentId
                            ?.title
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Ordered by{" "}
                        {
                          order.userId
                            ?.username
                        }
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status ===
                        "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {order.status}

                    </span>
                  </div>
                ))

              ) : (

                <p className="text-gray-500">
                  No orders found
                </p>

              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
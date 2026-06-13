import {
  Search,
  ShoppingCart,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import AdminSidebar from "./AdminSidebar";
import { getAllOrders } from "../api/admin";
import {logOut} from "../api/auth"

const OrdersPage = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [openMenu, setOpenMenu] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();

        setOrders(
          Array.isArray(res.allOrder)
            ? res.allOrder
            : []
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchOrders();
  }, []);

  // Search Filter
  const filteredOrders = orders.filter(
    (item) =>
      item.userId?.username
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );
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
    <div className="min-h-screen bg-gray-100 md:flex flex-col overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar active="orders" />
      </div>

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
                Orders
              </h2>

              <p className="text-gray-500 text-sm md:text-base">
                Track all equipment bookings
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="hidden sm:block bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
            FarmKart Admin
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {openMenu && (
          <div className="md:hidden bg-white shadow-md mx-4 mt-4 rounded-2xl p-4 space-y-3">


            <button
              onClick={() => {
                navigate(
                  "/Adashboard"
                );
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/admin/users");
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Users
            </button>

            <button
              onClick={() => {
                navigate(
                  "/admin/equipments"
                );
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Equipments
            </button>

            <button
              onClick={() => {
                navigate("/admin/orders");
                setOpenMenu(false);
              }}
              className="w-full hover:bg-gray-100 flex items-center gap-3 px-4 py-3 rounded-xl transition"
            >
              Orders
            </button>

            <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {/* Orders Content */}
        <div className="p-4 md:p-6">
          {/* Search */}
          <div className="bg-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm w-full md:w-80 mb-6">
            <Search
              size={18}
              className="text-gray-400 flex-shrink-0"
            />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="outline-none w-full bg-transparent"
            />
          </div>

          {/* Orders List */}
          <div className="space-y-4 pb-10">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl p-4 md:p-5 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                >
                  {/* Left */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="bg-blue-100 p-3 rounded-2xl flex-shrink-0">
                      <ShoppingCart
                        className="text-blue-700"
                        size={24}
                      />
                    </div>

                    <div className="min-w-0">
                      {/* Customer */}
                      <h2 className="text-lg font-semibold text-gray-800 break-words">
                        {
                          item.userId
                            ?.username
                        }
                      </h2>

                      <p className="text-sm text-gray-500 mt-1 break-words">
                        Contact :
                        {" "}
                        {
                          item.userId
                            ?.contact
                        }
                      </p>

                      {/* Equipment */}
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700">
                          Equipment :
                          {" "}
                          {
                            item
                              .equipmentId
                              ?.category
                          }
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Owner :
                          {" "}
                          {
                            item.ownerId
                              ?.username
                          }
                        </p>

                        <p className="text-sm text-gray-500 mt-1 break-all">
                          Owner Email :
                          {" "}
                          {
                            item.ownerId
                              ?.email
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Order Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status ===
                        "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status ===
                            "active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Equipment Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item
                          .equipmentId
                          ?.status ===
                        "booked"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Equipment :
                      {" "}
                      {item
                        .equipmentId
                        ?.status ||
                        "available"}
                    </span>

                    {/* Completed Badge */}
                    {item.status ===
                      "completed" && (
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                        <CheckCircle
                          size={16}
                        />
                        Finished
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-6 text-center text-gray-500 shadow-sm">
                No orders found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
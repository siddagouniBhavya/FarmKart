import React, { useState } from "react";
import {
  Search,
  CalendarDays,
  MapPin,
  Phone,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "../Sidebar";
import { getActiveOrders } from "../../api/equipment";
import { useEffect } from "react";


const statusStyles = {
  Running: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
};

const ActiveOrders = () => {
  const [orders,setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    const fetchOrders=async()=>{
      try{
        const res=await getActiveOrders();
        setOrders(res.orders || []);
      }
      catch(err){
        console.log(err.response?.data?.message)
      }
    };
    fetchOrders()
  },[])
  const filteredOrders = orders.filter(
    (item) =>
      item.userId?.username.toLowerCase().includes(search.toLowerCase()) ||
      item.equipmentId?.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-[#f5f7f2] overflow-hidden">

      {/* TOP NAVBAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm ">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="p-3 md:p-6">

        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#eef5df] to-[#f7faf1] px-5 md:px-8 py-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  My Rental status
                </h1>

                <p className="text-gray-500 mt-1 text-sm">
                  View and manage your ongoing equipment rentals
                </p>
              </div>

              <div className="bg-white rounded-2xl px-5 py-4 border shadow-sm w-fit">
                <p className="text-sm text-gray-500">Total Orders</p>

                <h2 className="text-2xl font-bold text-green-700">
                  {orders.length}
                </h2>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="p-4 md:p-6 border-b bg-white">
            <div className="relative w-full md:w-80">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
          </div>

          {/* ORDERS LIST */}
          <div className="h-[72vh] overflow-y-auto bg-[#fafcf8] p-4 md:p-6 space-y-5">

            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">

                  {/* LEFT */}
                  <div className="flex flex-col md:flex-row gap-5 flex-1">

                    {/* CUSTOMER */}
                    <div className="flex items-start gap-4 min-w-[240px]">

                      {/* LOGO */}
                      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-bold text-lg">
                          {order.userId?.username.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {order.userId?.username}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Phone size={14} />
                          {order.userId?.contact}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <MapPin size={14} />
                          {order.userId?.location}
                        </div>
                      </div>
                    </div>

                    {/* EQUIPMENT */}
                    <div className="flex gap-4 flex-1">

                      <img
                        src={order.equipmentId?.image}
                        alt={order.equipmentId?.name}
                        className="w-28 h-24 rounded-xl object-cover"
                      />

                      <div className="flex flex-col justify-between">

                        <div>
                          <h2 className="font-semibold text-lg text-gray-800">
                            {order.equipmentId?.name}
                          </h2>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <CalendarDays size={15} />
                           {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-green-800 mt-3">Total Price : 
                          {order.totalPrice}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="xl:w-[220px] flex flex-col gap-4">

                    {/* STATUS */}
                    <div
                      className={`px-3 py-2 rounded-xl text-sm font-medium w-fit ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </div>

                    {/* INFO CARD */}
                    <div className="bg-[#f8faf7] border border-gray-100 rounded-2xl p-4">

                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock3 size={16} />
                        Rental Status
                      </div>

                      <div className="flex items-center gap-2 mt-3 text-green-700 font-medium">
                        <CheckCircle2 size={18} />
                        {order.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {filteredOrders.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">

                <h2 className="text-xl font-semibold text-gray-700">
                  No Orders Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try searching with another keyword
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrders;
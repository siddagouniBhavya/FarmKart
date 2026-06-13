import React, { useEffect, useState } from "react";

import {
  User,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  IndianRupee,
  Tractor,
  Clock3,
  CheckCircle,
} from "lucide-react";

import Sidebar from "./Sidebar";

import { useParams } from "react-router-dom";

import { getSingleOrderDetails } from "../api/equipment";

const statusStyles = {
  pending: "bg-orange-100 text-orange-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const SingleOrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res =
        await getSingleOrderDetails(id);

      setOrder(res.order);
    } catch (err) {
      console.log(
        err.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f7f2]">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f2]">
      
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">

        {/* PAGE HEADER */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#eef5df] to-[#f7faf1] p-6 border-b">
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Order Details
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Complete booking information and status
                </p>
              </div>

              <div
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize w-fit ${statusStyles[order?.status]}`}
              >
                Status : {order?.status}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* CUSTOMER */}
            <div className="bg-[#fafcf8] rounded-2xl border border-gray-100 p-6">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Customer Details
              </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <User
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    {order?.userId?.username}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    {order?.userId?.contact}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    {order?.userId?.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    {order?.equipmentId
                      ?.location ||
                      "No location"}
                  </span>
                </div>
              </div>
            </div>

            {/* EQUIPMENT */}
            <div className="bg-[#fafcf8] rounded-2xl border border-gray-100 p-6">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Equipment Details
              </h2>

              <img
                src={order?.equipmentId?.image}
                alt={order?.equipmentId?.name}
                className="w-full h-64 object-cover rounded-2xl"
              />

              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-3">
                  <Tractor
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700 font-medium">
                    {order?.equipmentId?.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <IndianRupee
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    ₹{order?.totalPrice}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    {new Date(
                      order?.startDate
                    ).toLocaleDateString()}
                    {" "}to{" "}
                    {new Date(
                      order?.endDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock3
                    className="text-green-700"
                    size={18}
                  />

                  <span className="text-gray-700">
                    Ordered on{" "}
                    {new Date(
                      order?.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS SECTION */}
          <div className="p-6 border-t bg-white flex justify-end">
            
            {order?.status ===
            "completed" ? (
              <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                
                <CheckCircle size={20} />

                Order Completed
              </div>
            ) : (
              <div
                className={`px-6 py-3 rounded-xl font-medium capitalize ${statusStyles[order?.status]}`}
              >
                Order {order?.status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
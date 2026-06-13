import React, {
  useState,
  useEffect,
} from "react";

import {
  Search,
  Check,
  X,
  CalendarDays,
  MapPin,
  Phone,
  Eye,
} from "lucide-react";

import Sidebar from "../Sidebar";

import {
  getOrdersForVendor,
  updateStatus,
} from "../../api/equipment";

import { useNavigate } from "react-router";

const statusStyles = {
  pending:
    "bg-orange-100 text-orange-700",

  accepted:
    "bg-green-100 text-green-700",

  rejected:
    "bg-red-100 text-red-700",

  completed:
    "bg-blue-100 text-blue-700",
};

const BookingRequests = () => {
  const [requests, setRequests] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  // FETCH REQUESTS
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res =
          await getOrdersForVendor();

        // SORT LATEST FIRST
        const sortedRequests = (
          res.orders || []
        ).sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setRequests(sortedRequests);

      } catch (err) {
        console.log(
          err.response?.data?.message
        );
      }
    };

    fetchRequest();
  }, []);

  // ACCEPT REQUEST
  const handleAccept = async (id) => {
    try {
      await updateStatus(
        id,
        "accepted"
      );

      setRequests((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "accepted",
              }
            : item
        )
      );

    } catch (err) {
      console.log(
        err.response?.data?.message
      );
    }
  };

  // REJECT REQUEST
  const handleReject = async (id) => {
    try {
      await updateStatus(
        id,
        "rejected"
      );

      setRequests((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "rejected",
              }
            : item
        )
      );

    } catch (err) {
      console.log(
        err.response?.data?.message
      );
    }
  };

  // SEARCH FILTER
  const filteredRequests =
    requests.filter(
      (item) =>
        item.userId?.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.equipmentId?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-[#f5f7f2] overflow-x-hidden">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="p-3 md:p-6 w-full overflow-x-hidden">

        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#eef5df] to-[#f7faf1] px-5 md:px-8 py-6 border-b">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Booking Requests
                </h1>

                <p className="text-gray-500 mt-1 text-sm">
                  Manage incoming equipment rental requests
                </p>
              </div>

              <div className="bg-white rounded-2xl px-5 py-4 border shadow-sm w-fit">

                <p className="text-sm text-gray-500">
                  Total Requests
                </p>

                <h2 className="text-2xl font-bold text-green-700">
                  {requests.length}
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
                placeholder="Search requests..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
          </div>

          {/* REQUEST LIST */}
          <div className="h-[72vh] overflow-y-auto bg-[#fafcf8] p-4 md:p-6 space-y-5">

            {filteredRequests.map(
              (request) => (
                <div
                  key={request._id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">

                    {/* LEFT */}
                    <div className="flex flex-col md:flex-row gap-5 flex-1">

                      {/* CUSTOMER */}
                      <div className="flex items-start gap-4 min-w-[240px]">

                        {/* AVATAR */}
                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                          <span className="text-green-700 font-bold text-lg">
                            {request.userId?.username
                              ?.charAt(0)}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {
                              request.userId
                                ?.username
                            }
                          </h3>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">

                            <Phone size={14} />

                            {
                              request.userId
                                ?.contact
                            }
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">

                            <MapPin size={14} />

                            {
                              request.userId?.location
                            }
                          </div>
                        </div>
                      </div>

                      {/* EQUIPMENT */}
                      <div className="flex gap-4 flex-1">

                        <img
                          src={
                            request
                              .equipmentId
                              ?.image
                          }
                          alt={
                            request
                              .equipmentId
                              ?.name
                          }
                          className="w-28 h-24 rounded-xl object-cover"
                        />

                        <div className="flex flex-col justify-between">

                          <div>

                            <div className="flex items-center gap-2 flex-wrap">

                              <h2 className="font-semibold text-lg text-gray-800">
                                {
                                  request
                                    .equipmentId
                                    ?.name
                                }
                              </h2>

                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                {
                                  request
                                    .equipmentId
                                    ?.name
                                }
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">

                              <CalendarDays size={15} />

                              {
                                new Date(request.startDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })
                              }{"-"}{new Date(request.endDate).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                })}{" "}
                              
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-gray-600 mt-3">
                            Total Price : ₹
                            {
                              request.totalPrice
                            }
                            /-
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="xl:w-[240px] flex flex-col gap-4">

                      {/* STATUS */}
                      <div
                        className={`px-3 py-2 rounded-xl text-sm font-medium w-fit capitalize ${statusStyles[request.status]}`}
                      >
                        Status :{" "}
                        {request.status}
                      </div>

                      {/* ACTIONS */}
                      {request.status ===
                      "pending" ? (
                        <div className="flex flex-col sm:flex-row gap-3">

                          <button
                            onClick={() =>
                              handleAccept(
                                request._id
                              )
                            }
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
                          >
                            <Check size={18} />
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleReject(
                                request._id
                              )
                            }
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
                          >
                            <X size={18} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          className="border border-gray-200 hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-2 text-gray-700 font-medium transition"
                          onClick={() => {
                            navigate(
                              `/singleOrderDetails/${request._id}`
                            );
                          }}
                        >
                          <Eye size={18} />
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* EMPTY */}
            {filteredRequests.length ===
              0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">

                <h2 className="text-xl font-semibold text-gray-700">
                  No Requests Found
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

export default BookingRequests;
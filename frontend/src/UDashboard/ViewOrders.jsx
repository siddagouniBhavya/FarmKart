import Sidebar from "./Sidebar";
import { useEffect,useState } from "react";
import { getMyOrders } from "../api/equipment";
import Swal from "sweetalert2";
import { cancelOrder } from "../api/equipment";

const ViewOrders = () => {
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    const fetchOrders=async()=>{
      try{
        const res=await getMyOrders();
        setOrders(res.equipments);
      }
      catch(err){
        console.log(err.message)
      }
    };
    fetchOrders();
  },[])
  const handleCancelOrder = async (id) => {
  const result = await Swal.fire({
    title: "Cancel Order?",
    text: "This order will be cancelled permanently.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Cancel",
  });

  if (result.isConfirmed) {
    try {
        const res=await cancelOrder(id);
       
      setOrders((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status: "cancelled" }
            : item
        )
      );

      Swal.fire({
        title: "Cancelled!",
        text: "Order cancelled successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message,
        icon: "error",
      });
    }
  }
};

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-[#654a4a] mb-2">
          My Orders
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your equipment bookings easily
        </p>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f5f1f1] text-[#654a4a]">
              <tr>
                <th className="p-4">Equipment</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.equipmentId?.image}
                        alt={`equipment-${item.equipmentId?.name}`}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium truncate">
                         {item.equipmentId?.category}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">₹{item.totalPrice}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.status === "pending" && (
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all" onClick={()=>handleCancelOrder(item._id)}
                      >Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
                <div className="md:hidden space-y-4 w-full">
                {orders?.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow p-4 flex gap-4 w-full overflow-hidden"
                  >
                    <img
                      src={item.equipmentId?.image}
                      alt={`equipment-${item.equipmentId?.name}`}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-[#654a4a] truncate">
                        Equipment {item.equipmentId?.name}
                      </h2>

                      <p className="text-sm text-gray-500 truncate">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold whitespace-nowrap">
                          ₹{item.totalPrice}
                        </span>

                        <span
                          className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : item.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {item.status === "pending" && (
                        <button
                          onClick={() => handleCancelOrder(item._id)}
                          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition-all"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
          </div>
      </div>
    </div>
  );
};

export default ViewOrders;
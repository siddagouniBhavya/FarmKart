import {
  Search,
  Tractor,
  Menu,
  X,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {logOut} from "../api/auth"

import { getAllEquipments,adminDeleteEquipment } from "../api/admin";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";


const EquipmentsPage = () => {
  const [search, setSearch] = useState("");
  const [equipments, setEquipments] =
    useState([]);
  const [openMenu, setOpenMenu] =
    useState(false);

  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res =
          await getAllEquipments();

        setEquipments(
          Array.isArray(
            res.allEquipments
          )
            ? res.allEquipments
            : []
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchEquipments();
  }, []);
  const handleRemove=async(id)=>{
    const result=await Swal.fire({
      title:"Remove Equipment?",
      icon:"warning",
      input:"text",
      inputLabel:"Reason for deletion",
      inputPlaceholder:"Enter reason...",
      
      showCancelButton:true,
      confirmButtonColor:"#dc2626",
      cancelButtonColor:"#6b7280",
      confirmButtonText:"Delete",
      inputValidator : (value)=>{
        if(!value){
          return "Reason is Required";
        }
      },
    });
    if(result.isConfirmed){
      try{
        await adminDeleteEquipment(id,result.value);
        
        setEquipments((prev)=>{
          prev.filter((item)=>item._id !== id)
        })
        Swal.fire({
        title: "Deleted!",
        text: "Equipment has been removed successfully.",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });
       //to refresh

      }catch(err){
        Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      }
    }
    
  }
  // Search Filter
  const filteredEquipments =
    equipments.filter((item) =>
      item.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 md:flex  flex-col overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar active="equipments" />
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
                Equipments
              </h2>

              <p className="text-gray-500 text-sm md:text-base">
                View and manage listed
                equipments
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

            <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="p-4 md:p-6 min-h-screen">
          {/* Search */}
          <div className="bg-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm w-full md:w-80 mb-6">
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search equipments..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="outline-none w-full bg-transparent"
            />
          </div>

          {/* Equipments List */}
          <div className="space-y-4 pb-10">
            {filteredEquipments.length >
            0 ? (
              filteredEquipments.map(
                (item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl p-4 md:p-5 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 w-full overflow-hidden"
                  >
                    {/* Left */}
                    <div className="flex items-start gap-4 min-w-0">
                      {/* Icon */}
                      <div className="bg-yellow-100 p-3 rounded-2xl shrink-0">
                        <Tractor
                          className="text-yellow-700"
                          size={24}
                        />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 break-words">
                        <h2 className="text-lg font-semibold text-gray-800 break-words">
                          {
                            item.category
                          }
                        </h2>

                        <p className="text-sm text-gray-500 mt-1 break-all">
                          Owner :
                          {" "}
                          {
                            item.owner
                              ?.username
                          }
                        </p>

                        <p className="text-sm text-gray-500 mt-1 break-all">
                          Email :
                          {" "}
                          {
                            item.owner
                              ?.email
                          }
                        </p>

                        <p className="text-sm text-gray-500 mt-1 break-all">
                          Contact :
                          {" "}
                          {
                            item.owner
                              ?.contact
                          }
                        </p>

                        <p className="text-sm text-gray-500 mt-1 break-all">
                          Location :
                          {" "}
                          {
                            item.location
                          }
                        </p>
                          <p className="text-sm text-gray-500 mt-1 break-all">
                          Vehicle No :
                          {" "}
                          {
                            item.vehicleNo
                          }
                        </p>
                          <p className="text-sm text-gray-500 mt-1 break-all">
                          Price :
                          {" "}
                          {
                            item.price
                          }
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-start md:items-center gap-3 flex-wrap">
                      {/* Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.bookingStatus ===
                          "booked"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.bookingStatus ||
                          "available"}
                      </span>

                      {/* Remove Button */}
                      {item.bookingStatus !==
                      "booked" ? (
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                        onClick={()=>{handleRemove(item._id)}}>
                          Remove
                        </button>
                      ) : (
                        <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium">
                          Cannot Remove
                        </div>
                      )}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="bg-white rounded-3xl p-6 text-center text-gray-500 shadow-sm">
                No equipments found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentsPage;
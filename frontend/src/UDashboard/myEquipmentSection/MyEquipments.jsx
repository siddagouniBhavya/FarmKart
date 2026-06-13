import {
  MapPin,
  Tractor,
  Wrench,
  PenSquare,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { getMyEquipment, deleteEquipment} from "../../api/equipment";
import { useAuth } from "../../state/AuthState";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyEquipments = () => {
  // Dynamic Equipment State
  const [equipments, setEquipments] = useState([]);
  const {loading}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchEquipments=async()=>{
      try{
        const res=await getMyEquipment();
        setEquipments(res.equipment || []);

      }
      catch(err){
        console.log(err.response?.data?.message)
      }
    };
    fetchEquipments();
  },[])

  if(loading){
    //loading
    return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-black">
      <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">

        <div className="w-16 h-16 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin"></div>

        <p className="text-gray-300 animate-pulse tracking-wider">
          Loading your experience...
        </p>

      </div>
    </div>
  );


  }
  //handle delete
 const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Equipment?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
  });

  if (!result.isConfirmed) return;

  try {

    await deleteEquipment(id);

    // update UI instantly
    setEquipments((prev) =>
      prev.filter((item) => item._id !== id)
    );

    Swal.fire({
      title: "Deleted!",
      text: "Equipment deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (err) {

    Swal.fire({
      title: "Error",
      text: err.response?.data?.message || "Something went wrong",
      icon: "error",
    });
  }
};

 

  return (
    <div className="min-h-screen bg-[#f4f7f3] overflow-x-hidden">
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="pt-20 px-3 sm:px-5 lg:px-7 pb-8 w-full">
        
        {/* Container */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="relative px-4 sm:px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-green-50">
            
            {/* Background Tractor */}
            <div className="absolute right-0 top-0 opacity-10 hidden md:block">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1998/1998610.png"
                alt="tractor"
                className="h-28"
              />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              {/* Heading */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  My Equipments
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Manage and update your listed farm equipment.
                </p>
              </div>

              {/* Add Button */}
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 w-full sm:w-auto"
              onClick={()=>{navigate("/addequipments")}}>
                + Add New Equipment
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="p-4 sm:p-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {equipments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  
                  {/* Equipment Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                  
                   
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    
                    {/* Equipment Name */}
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h2>

                    {/* Category */}
                    <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                      <Tractor size={15} />
                      <span>{item.category}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                      <MapPin size={15} />
                      <span>{item.location}</span>
                    </div>

                    {/* Price */}
                    <p className="text-green-600 font-bold text-2xl mt-3">
                      ₹{item.price}
                      <span className="text-sm font-medium text-gray-500">
                        {" "}
                        / day
                      </span>
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mt-3 min-h-[55px]">
                      {item.description}
                    </p>

                    {/* Update Button */}
                    <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200
                    " onClick={()=>{navigate(`/updateEquipment/${item._id}`)}}>
                      <PenSquare size={16} />
                      Update Equipment
                    </button>
                    <button onClick={()=>handleDelete(item._id)}
                    className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200"><Trash2 size={16}/>Delete Equipment</button>

                  
                    
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {equipments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                
                <Wrench
                  size={60}
                  className="text-gray-300"
                />

                <h2 className="text-xl font-bold text-gray-700 mt-4">
                  No Equipments Found
                </h2>

                <p className="text-gray-500 mt-2">
                  You haven’t added any equipment yet.
                </p>

                <button className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg" onClick={()=>{navigate("/addequipments")}}>
                  + Add Equipment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEquipments;
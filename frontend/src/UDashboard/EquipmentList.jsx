import { useState } from "react";
import Navbar from "./Sidebar"; // (your file name is Sidebar but it's Navbar)
import { useNavigate } from "react-router-dom";
import Search from "/src/HomeComponents/Search.jsx";
import { useAuth } from "../state/AuthState";
import { useEffect } from "react";
import { getAll,getSingleEquipment } from "../api/equipment";



const EquipmentList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const {equipment,setEquipment,setLoading,loading}=useAuth();
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getAll();
      setEquipment(res.equipment || []);
    } catch (err) {
      console.log(err.message);
    }finally{
      setLoading(false)
    }
  };
  fetchData();
}, []);

  
  const handleEquipmentDetails=async(id)=>{
    try{
     
      navigate(`/equipmentdetail/${id}`)

    }
    catch(err){
      console.log(err.message)
    }
  }

  
  const filteredData = equipment?.filter((item) => {
    if (!selectedCategory) return true;
    return item.name.toLowerCase() .includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/*  NAVBAR (Top) */}
      <Navbar />

      {/*  PAGE CONTENT */}
      <div className="p-4 md:p-6">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Equipments List
        </h1>

        {/*  Search */}
        <Search
          className="bg-white shadow-md rounded-lg"
          onCategoryChange={setSelectedCategory}
        />

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-gray-700 text-lg font-semibold">
                  {item.category}
                </h2>

                <p className="text-orange-500 font-bold">
                  {item.price}
                </p>

                <button
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
                  onClick={()=>{handleEquipmentDetails(item._id)}}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ No Results */}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No equipment found
          </p>
        )}
      </div>
    </div>
  );
};

export default EquipmentList;
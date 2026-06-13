import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect,useState } from "react";
import { getSingleEquipment } from "../api/equipment";
import {
  User,
  Phone,
  Mail,
  IndianRupee,
  Loader,
} from "lucide-react";
import { useAuth } from "../state/AuthState";
// import Loader  from "../components/Loader";

const EquipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 const {equipment}=useAuth();
 const [selectedEquipment,setSelectedEquipment]=useState(null)
 console.log(equipment)
 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getSingleEquipment(id);
      console.log("API RESPONSE:", res);

      setSelectedEquipment(res.equipment || res);
    } catch (err) {
      console.log(err.message);
    }
  };

  fetchData();
}, [id]);



 

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-6">
        
        <div className="max-w-6xl mx-auto">
          
          <h1 className="text-xl md:text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-3 mb-6">
            Equipment Details
          </h1>

          {selectedEquipment ? (
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
              
              {/* Title */}
              <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-5 break-words">
                {selectedEquipment.name}
              </h2>

              {/* Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Image */}
                  <img
                    src={selectedEquipment.image}
                    alt={selectedEquipment.username}
                    className="w-full h-64 md:h-90 object-cover rounded-xl"
                  />

                  {/* Description */}
                 
                </div>

                {/* RIGHT */}
                <div className="space-y-4">
                  
                  {/* Owner */}
                  <div className="border border-gray-300 rounded-xl p-4 space-y-3">
                    <h3 className="text-gray-700 font-semibold mb-2">
                      Owner Information
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
                      <User size={16} />
                      <span>{selectedEquipment.owner?.username}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
                      <Phone size={16} />
                      <span>{selectedEquipment.owner?.contact}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
                      <Mail size={16} />
                      <span>{selectedEquipment.owner?.email}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border border-gray-300 rounded-xl p-4">
                    <h3 className="text-gray-700 font-semibold mb-1">
                      Price
                    </h3>
                    <div className="flex items-center gap-2 text-orange-500 font-bold text-lg">
                      <IndianRupee size={18} />
                      <span>{selectedEquipment.price} / day</span>
                    </div>
                  </div>

                  {/* Availability */}
                   <div className="border border-gray-300 rounded-xl p-4">
                    <h3 className="text-gray-700 font-semibold mb-2">
                      Description
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed break-words">
                      {selectedEquipment.description}
                    </p>
                  </div>
                </div>
              </div>

                    {/* CTA */}
            <div className="pt-2">
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white py-3 mt-2 rounded-xl font-semibold shadow-md hover:shadow-lg"
                onClick={() => {
                  navigate(`/bookingpage/${selectedEquipment._id}`);
                }}
              >
                Book Now
              </button>
            </div>            
            </div>
          ) : (
            <p className="text-red-500 font-medium">
              Equipment not found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;



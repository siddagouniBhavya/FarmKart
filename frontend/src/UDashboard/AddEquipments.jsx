import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../UDashboard/Sidebar";
import Swal from "sweetalert2";
import  { addEquipment} from "../api/equipment"


const AddEquipments = () => {
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    location:"",
    vehicleNo:"",
    image: null,
   
  });




  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setFileName(file?.name || "");
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // ✅ Manual validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.location || !formData.vehicleNo
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill all fields",
        icon: "error",
      });
      return;
    }

    if (!formData.image) {
      Swal.fire({
        title: "Image Required",
        text: "Please upload an equipment image",
        icon: "error",
      });
      return;
    }

    
    // Success
   try{
    const res=await addEquipment(formData) 
    
     Swal.fire({
      title: "Equipment Added",
      text: res.message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/login/userdashboard"); // or /my-equipments
    });
   }catch(err){
       Swal.fire({
        title: "Error",
        text: err.response?.data?.message,
        icon: "error",
      });
   }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex justify-center items-center mt-10 px-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">

          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Add Equipment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Equipment Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter equipment name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                Price per Day (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                min="100"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select Category</option>
                <option value="Tractor">tractor</option>
                <option value="Harvester">harvester</option>
                <option value="Plough">plough</option>
                <option value="rotator">rotator</option>
                <option value="dozer">dozer</option>
                <option value="corn planter">corn planter</option>
                <option value="rotator tiller">rotator tiller</option>
              </select>
            </div>

            {/* location */}
             <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>
              <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Vehicle No</label>
              <input
                type="text"
                name="vehicleNo"
                placeholder="Enter vehicle no"
                value={formData.vehicleNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>
            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Upload Image</label>

              <label className="cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-center hover:bg-gray-200">
                Choose Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              {fileName && (
                <p className="text-sm text-green-600">
                  📄 {fileName}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Equipment
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEquipments;
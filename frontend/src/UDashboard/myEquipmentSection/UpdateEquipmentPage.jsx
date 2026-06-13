import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  IndianRupee,
  MapPin,
  FileText,
  Save,
  Tractor,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleEquipment, updateEquipment } from "../../api/equipment";
import Swal from "sweetalert2";

const UpdateEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [equipment, setEquipment] = useState(null);

  const [formData, setFormData] = useState({
    price: "",
    description: "",
    location: "",
  });

  // FETCH EQUIPMENT
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await getSingleEquipment(id);

        setEquipment(res.equipment);

        setFormData({
          price: res.equipment.price || "",
          description: res.equipment.description || "",
          location: res.equipment.location || "",
        });
      } catch (err) {
        console.log(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isChanged=
    formData.price!==equipment.price || 
    formData.location!==equipment.location ||
    formData.description!==equipment.description ;
    if(!isChanged){
      return Swal.fire({
        title :"No Changes",
        text:"You didnt update anything",
        icon : "info",
        confirmButtonText:"Ok"
      });
    }
    try {
      const res = await updateEquipment(id, formData);

      Swal.fire({
        title: "Success",
        text: res.message,
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate(-1);
    } catch (err) {
      Swal.fire({
        title: "Update Failed",
        text: err.response?.data?.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f2]">
        <Sidebar />

        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-xl font-semibold text-gray-600">
            Loading...
          </h1>
        </div>
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
      <div className="p-4 md:p-6">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#eef5df] to-[#f7faf1] px-6 py-6 border-b">

            <h1 className="text-3xl font-bold text-gray-800">
              Update Equipment
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              View all equipment details and update allowed fields
            </p>
          </div>

          {/* IMAGE */}
          <div className="p-6 border-b bg-[#fafcf8]">
            <img
              src={equipment?.image}
              alt={equipment?.name}
              className="w-full h-[280px] object-cover rounded-2xl"
            />
          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-2 gap-6 p-6 border-b bg-white">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Equipment Name
              </label>

              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50">

                <Tractor size={18} className="text-gray-400" />

                <span className="font-medium text-gray-800">
                  {equipment?.name}
                </span>
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Category
              </label>

              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50">

                <Tag size={18} className="text-gray-400" />

                <span className="font-medium text-gray-800">
                  {equipment?.category}
                </span>
              </div>
            </div>

            {/* STATUS */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Availability Status
              </label>

              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-50">

                <ShieldCheck size={18} className="text-gray-400" />

                <span className="font-medium text-gray-800">
                  {equipment?.availability ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* OWNER */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Owner
              </label>

              <div className="border rounded-xl px-4 py-3 bg-gray-50 font-medium text-gray-800">
                {equipment?.owner?.username || "You"}
              </div>
            </div>
          </div>

          {/* UPDATE FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >

            {/* PRICE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Update Price
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Update Location
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Update Description
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
            >
              <Save size={18} />
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEquipment;
import { useState,useEffect } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../state/AuthState";
import {
  MapPin,
  Phone,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import Swal from "sweetalert2";
import { changePassword ,updateProfile} from "../api/auth";

const Profile = () => {
  const { user } = useAuth();

  // PROFILE STATE
  const [formData, setFormData] = useState({
    username: user?.username || "",
    contact: user?.contact || "",
    location: user?.location || "",
    email: user?.email || "",
  });

  // PASSWORD STATE
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // SHOW / HIDE PASSWORD
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // PROFILE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PASSWORD INPUT CHANGE
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
useEffect(() => {
 
  if (user) {
    setFormData({
      username: user?.username || "",
      contact: user?.contact || "",
      location: user?.location || "",
      email: user?.email || "",
    });
  }
}, [user]);
  // UPDATE PROFILE
  const handleProfileUpdate = async () => {

        const isChanged =
          formData.username !== user?.username ||
          formData.contact !== user?.contact ||
          formData.location !== user?.location;

        if (!isChanged) {
          return Swal.fire({
            icon: "info",
            title: "No Changes",
            text: "You didn't update anything",
            confirmButtonColor: "#16a34a",
          });
  }
      try{
        const res=await updateProfile(formData);
            Swal.fire({
            icon: "success",
            title: "Profile Updated",
            text: "Your profile updated successfully",
            confirmButtonColor: "#16a34a",
          });
          setFormData({
              username: res.user?.username,
              contact: res.user?.contact,
              location: res.user?.location,
              email: res.user?.email,
            });
          
      }
      catch(err){
        console.log(err.message)
        Swal.fire({
          icon:"error",
          title:"Update Failed",
          text:err.response?.data?.message 
        });
      }
  };

  // CHANGE PASSWORD
  const handlePasswordUpdate = async () => {
    try {

      const { oldPassword, newPassword } =
        passwordData;

      // VALIDATIONS
      if (!oldPassword || !newPassword) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all fields",
          confirmButtonColor: "#16a34a",
        });
      }

      if (newPassword.length < 6) {
        return Swal.fire({
          icon: "warning",
          title: "Weak Password",
          text: "Password must contain at least 6 characters",
          confirmButtonColor: "#16a34a",
        });
      }

      // CONFIRMATION
      const result = await Swal.fire({
        title: "Change Password?",
        text: "Your password will be updated",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Update",
      });

      if (!result.isConfirmed) return;

      // API CALL
      const res = await changePassword(
        oldPassword,
        newPassword
      );

      // SUCCESS
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: res.message,
        confirmButtonColor: "#16a34a",
      });

      // CLEAR FIELDS
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong",
        confirmButtonColor: "#16a34a",
      });
    }
  };

  // PROFILE LETTER
  const firstLetter =
    formData.username?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f4f7f3] overflow-x-hidden">

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-10">

        {/* CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">

          {/* PROFILE CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-8">

              <div className="flex items-center gap-5">

                {/* PROFILE LETTER */}
                <div className="w-20 h-20 rounded-full bg-white text-green-600 flex items-center justify-center text-3xl font-bold shadow-md">
                  {firstLetter}
                </div>

                {/* USER INFO */}
                <div className="text-white">

                  <h1 className="text-2xl font-bold">
                    {formData.username}
                  </h1>

                  <p className="text-green-100 mt-1">
                    Farmer / Equipment Renter
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-6">

              {/* USERNAME */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>

                <div className="relative mt-2">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone Number
                </label>

                <div className="relative mt-2">

                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Location
                </label>

                <div className="relative mt-2">

                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* UPDATE BUTTON */}
              <button
                onClick={handleProfileUpdate}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Update Profile
              </button>
            </div>
          </div>

          {/* PASSWORD CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* HEADER */}
            <div className="border-b border-gray-100 px-6 py-5 bg-gray-50">

              <h2 className="text-xl font-bold text-gray-800">
                Change Password
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Secure your account with a strong password
              </p>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">

              {/* OLD PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Old Password
                </label>

                <div className="relative mt-2">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showOld ? "text" : "password"}
                    autoComplete="new-password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter old password"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-14 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showOld ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  New Password
                </label>

                <div className="relative mt-2">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showNew ? "text" : "password"}
                    autoComplete="new-password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-14 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNew ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handlePasswordUpdate}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
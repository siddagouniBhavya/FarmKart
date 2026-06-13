import {
  RiUserFill,
  RiLock2Fill,
  RiMailFill,
  RiPhoneFill,
  RiMapPinFill
} from '@remixicon/react'
import { Link } from 'react-router-dom'

const RightContentRegister = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="flex w-full md:w-1/2 items-center justify-center bg-white px-8 py-12">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/images/Logo_farmkart.png"
            alt="logo"
            className="w-16 mb-2"
          />
          <h1 className="text-3xl font-bold">
            <span className="text-green-800">Farm</span>
            <span className="text-green-500">Kart</span>
          </h1>
          <p className="text-sm text-gray-500">Rental Equipment System</p>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join FarmKart to rent equipment</p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="relative">
            <RiUserFill className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-12 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <RiMailFill className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-12 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <RiPhoneFill className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              name="phoneno"
              value={formData?.phoneno || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              maxLength={10}
              className="w-full pl-12 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          {/* location */}
           <div className="relative">
            <RiMapPinFill className="absolute left-4 top-3 text-gray-500" />
            
            <input
              type="text"
              name="location"
              value={formData?.location || ""}
              onChange={handleChange}
              placeholder="Location"
              
              className="w-full pl-12 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          {/* Password */}
          <div className="relative">
            <RiLock2Fill className="absolute left-4 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              value={formData?.password || ""}
              onChange={handleChange}
              placeholder="Password"
              minLength={8}
              className="w-full pl-12 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-600 hover:scale-105 transition"
          >
            Sign Up
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RightContentRegister;
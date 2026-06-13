import { RiUserFill, RiCheckboxCircleFill, RiTruckFill } from "@remixicon/react";

const Work = () => {
  return (
    <div className="bg-gray-50 py-12 px-4">
      
      {/* Heading */}
      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-700 mb-10">
        How it Works
      </h1>

      {/* Steps Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">

        {/* Step 1 */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-green-100 p-4 rounded-full mb-3">
            <RiUserFill className="text-green-600 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <p className="font-semibold text-gray-700">Register</p>
          <p className="text-sm text-gray-500">
            Sign up & get verified
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-gray-400 text-2xl">→</div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-orange-100 p-4 rounded-full mb-3">
            <RiCheckboxCircleFill className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <p className="font-semibold text-gray-700">Get Approved</p>
          <p className="text-sm text-gray-500">
            Wait for admin approval
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-gray-400 text-2xl">→</div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-yellow-100 p-4 rounded-full mb-3">
            <RiTruckFill className="text-yellow-500 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <p className="font-semibold text-gray-700">Rent or List</p>
          <p className="text-sm text-gray-500">
            Start renting or listing equipment
          </p>
        </div>

      </div>
    </div>
  );
};

export default Work;
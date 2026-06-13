const EquipmentHome = () => {
  return (
    <>
      <div className="bg-[#FCF5E5] p-4">
        <h1 className="font-bold text-2xl text-center pb-4 text-green-700">
          Featured Equipments
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card */}
          <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
            <img
              src="/images/TractorPost.webp"
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="font-bold">Tractor</p>
            <p className="text-orange-500 font-medium text-lg">$150/day</p>
            <button className="bg-green-600 text-white px-2 py-2 w-full rounded-md font-medium mt-2 hover:bg-green-500">
              Rent Now
            </button>
          </div>

          {/* Repeat cards */}
          <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
            <img src="/images/TractorPost.webp" className="w-full h-40 object-cover rounded-md mb-2"/>
            <p className="font-bold">Tractor</p>
            <p className="text-orange-500 font-medium text-lg">$150/day</p>
            <button className="bg-green-600 text-white px-2 py-2 w-full rounded-md mt-2">
              Rent Now
            </button>
          </div>

          <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
            <img src="/images/TractorPost.webp" className="w-full h-40 object-cover rounded-md mb-2"/>
            <p className="font-bold">Tractor</p>
            <p className="text-orange-500 font-medium text-lg">$150/day</p>
            <button className="bg-green-600 text-white px-2 py-2 w-full rounded-md mt-2">
              Rent Now
            </button>
          </div>

          
         
        </div>
      </div>
    </>
  );
};

export default EquipmentHome;
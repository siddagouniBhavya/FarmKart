
import { useNavigate } from "react-router";

const Hero=()=>{
  const navigate=useNavigate();
    return(
        <>
      
         <div className="relative w-full h-[30vh] md:h-[55vh]">

      {/* Background Image */}
      <img
        src="/images/tractorHome.webp"
        alt="tractor"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-5">

        <div>
          <h1 className="text-white font-bold text-2xl md:text-4xl">
            Rent Farming Equipment Easily
          </h1>
          <p className="text-gray-200 text-sm md:text-lg mt-2">
            Find or list farm equipment for rent
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-green-500 px-6 py-2 active:bg-green-400 rounded-lg text-white font-bold" onClick={()=>{navigate('/equipmentlist')}}>
            Browse Equipment
          </button>

          <button className="bg-orange-400 px-6 py-2 active:bg-orange-300 rounded-lg text-white font-bold" onClick={()=>{navigate('/addequipments')}}>
            List your Equipment
          </button>
        </div>

      </div>
    </div>
        
        </>
    )
}

export default Hero;
import { useState } from "react";
import { useNavigate } from "react-router";

const Search=({className='',onCategoryChange })=>{
    const [category,setCategory]=useState("");
    const navigate=useNavigate();
    return(
        <>
            <div className={`${className} p-4`}>
                <h1 className="text-lg md:text-xl font-semibold mb-3 text-green-900 text-center md:text-left">Find The Equipment You Need</h1>
               <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-4 rounded-xl shadow-md">
  
  {/* Select Dropdown */}
  <select
    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
    onChange={(e) => {
      setCategory(e.target.value);
      onCategoryChange && onCategoryChange(e.target.value);
    }}
  >
    <option value="">Select Category</option>
    <option value="harvester">Harvester</option>
    <option value="rotators">Rotators</option>
    <option value="Dozer">Dozer</option>
    <option value="corn planter">Corn planter</option>
    <option value="Tractor">Tractor</option>
    <option value="Plough">Plough</option>
    <option value="Rotary Tiller">Rotary Tiller</option>
  </select>

  {/* Search Button */}


</div>
          
            
            </div>
        
        </>
    )
}

export default Search;
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const NavBar=()=>
{

    const [menuOpen,setMenuOpen]=useState(false);
    const navigate=useNavigate();
    return(
            <>
              <div className="w-full bg-green-500 px-4 py-2 flex items-center justify-between">
                {/* Logo section */}
                      <div className="flex items-center gap-2">
                        <img src="/images/HomeLogo-removebg-preview.png"
                         className="w-12 h-12 object-contain" alt="logo"/>
                         <h1 className="pt-3 font-bold text-white text-lg">FarmKart</h1>
               </div>
                <div className="hidden md:flex items-center gap-6 text-white font-medium">
                    <a className="cursor-pointer hover:text-gray-200">Home</a>
                    <a className="cursor-pointer hover:text-gray-200" onClick={()=>{navigate('/equipmentlist')}}>Equipments</a>
                    {/* <a className="cursor-pointer hover:text-gray-200">About us</a> */}
                    <Link className="cursor-pointer hover:text-gray-200" to='/login'>Login</Link>
                    <Link className="bg-white text-green-600 px-4 py-1 rounded-lg hover:bg-gray-200" to='/register'>Register</Link>
                </div>
              
              {/* Mobile menubutton */}
              <div className="md:hidden">
                <button onClick={()=>setMenuOpen(!menuOpen)}>
                    <span className="text-white text-2xl">☰</span>
                </button>

              </div>
              </div>
              {/* Mobile dropdown menu */}

              {menuOpen && (
                <div className="md:hidden bg-green-500 px-4 pb-4 flex flex-col gap-3 text-white font-medium">
                    <a className=" cursor-pointer active:text-gray-200">Home</a>
                    <a className="active:gray-200" onClick={()=>{navigate('/equipmentlist')}}>Equipments</a>
                    {/* <a className="active:text-gray-200">About us</a> */}
                    <a className="active:text-gray-200" onClick={()=>{navigate("/login")}}>Login</a>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg active:scale-105" onClick={()=>{navigate("/register")}}>Register</button>
                </div>
              )}

            
            </>


    )
}

export default NavBar;
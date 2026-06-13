import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import axios from 'axios'

import LeftContent from './LoginComponents/LeftContent'
import RightContentRegister from './RegisterComponents/RightContentRegister'
import { registerUser } from '../api/auth'

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    location:""
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await registerUser(formData);
   
      
       toast.success(res.message,{
        onClose:()=>(navigate("/login")),
        autoClose:1500,
       });
      
    
    }
    catch(err){
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <LeftContent />

      <RightContentRegister
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default Register;
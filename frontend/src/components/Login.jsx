import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { loginUser } from '../api/auth';
import LeftContent from './LoginComponents/LeftContent';
import RightContent from './LoginComponents/RightContent';
import {useAuth} from "../state/AuthState"

;

const Login = () => {

  const navigate = useNavigate();
  const {setUser}=useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await loginUser(formData)
      setUser(res.user)
      toast.success(res.message)
      const role=res.user.role;
      if(role==="user"){
        navigate("/login/userdashboard")

      }
      else{
        navigate("/Adashboard")
      }
    }
    catch(err){
      toast.error(err.response?.data?.message)
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

      <RightContent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default Login;
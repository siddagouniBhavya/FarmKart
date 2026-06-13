import apiClient from "./client";



export const registerUser = async (formData) => {
  const res = await apiClient.post("/user/register", {
    username: formData.name,
    email: formData.email,
    password: formData.password,
    contact: formData.phoneno,
    location:formData.location
  });

  return res.data;
};



export const loginUser = async (formData) => {
  const res = await apiClient.post("/user/login", {
    email: formData.email,
    password: formData.password,
  });

  return res.data;
};



export const getProfile = async () => {
  const res = await apiClient.get("/user/getProfile");
  return res.data;
};

export const logOut =async()=>{
  const res=await apiClient.post("/user/logout");
  return res.data
}

export const changePassword=async(op,np)=>{
  const res=await apiClient.patch("/user/changePassword",
   {
     oldPassword:op,
      updatePassword:np
   }
  );
  return res.data
}

export const updateProfile=async(formData)=>{
const res=await apiClient.patch("/user/updateProfile",formData,{
  withCredentials:true
});
return res.data

}
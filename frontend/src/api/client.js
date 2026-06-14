import axios from "axios";
const apiClient=axios.create({
    baseURL:"https://farmkart-backend.onrender.com/api",
    withCredentials:true
});

export default apiClient;
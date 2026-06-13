import apiClient from "./client";

export const dashboardAdmin=async()=>{
    const res=await apiClient.get("/admin/dashboardAdmin")
    return res.data
}
export const getAllUsers=async()=>{
    const res=await apiClient.get("/admin/getAllUsers")
    return res.data
}

export const getAllEquipments=async()=>{
    const res=await apiClient.get("/admin/getAllEquipments");
    return res.data
}
export const getAllOrders=async()=>{
    const res=await apiClient.get("/admin/getAllOrders");
    return res.data
}

export const getLatestOrders=async()=>{
    const res=await apiClient.get("/admin/getLatestOrders");
    return res.data;
}
export const getRecentNotifications=async()=>{
    const res=await apiClient.get("/admin/getRecentNotifications");
    return res.data
}
export const adminDeleteEquipment=async(id,reason)=>{
    const res=await apiClient.delete(`/admin/deleteEquipment/${id}`,
        {data:{reason}})
    return res.data
    
}
export const blockUser=async(id,reason)=>{
    const res=await apiClient.patch(`/admin/blockUser/${id}`,{
        reason
    })
    return res.data;
}
export const unBlock=async(id)=>{
    const res=await apiClient.patch(`/admin/unblockUser/${id}`)
    return res.data
}
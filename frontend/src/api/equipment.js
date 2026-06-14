import apiClient from "./client";

export const getAll=async()=>{
    const res=await apiClient.get("/equipment/getAll")
    return res.data
};
export const getSingleEquipment=async(id)=>{
    const res=await apiClient.get(`/equipment/singleEquipment/${id}` )
    return res.data
}

//order
export const createBooking=async(id,data)=>{
    const res=await apiClient.post(`/order/createBooking/${id}`,
       data
    )
    return res.data
}

export const addEquipment=async(formData)=>{
    const data=new FormData();

    data.append("name",formData.name);
    data.append("category",formData.category);
    data.append("price",formData.price);
    data.append("location",formData.location);
    data.append("description",formData.description);
    data.append("vehicleNo",formData.vehicleNo)
    data.append("image",formData.image);
    const res=await apiClient.post("/equipment/add",data)
    return res.data;
}

export const getMyOrders=async()=>{
    const res=await apiClient.get("/order/getMyOrders");
    return res.data
}

//equipment
export const getMyEquipment=async()=>{
    const res=await apiClient.get("/equipment/getMyEquipment")
    return res.data;
}

//orders
export const toggle_availability=async(id)=>{
    const res=await apiClient.patch(`/order/toggle_availability/${id}`)
    return res.data;
}


//orders
export const getOrdersForVendor=async()=>{
    const res=await apiClient.get("/order/getOrdersForVendor")
    return res.data
}

export const updateStatus=async(id,status)=>{
    const res=await apiClient.patch(`/order/updateStatus/${id}`,{status});
    return res.data
}



export const getSingleOrderDetails=async(id)=>{
    const res=await apiClient.get(`/order/getSingleOrderDetails/${id}`)
    return res.data
}
export const getActiveOrders=async()=>{
    const res=await apiClient.get("/order/getActiveOrders");
    return res.data
}

//update equipments
export const updateEquipment=async(id,data)=>{
    const res=await apiClient.patch(`/equipment/updateEquipment/${id}`,data);
    return res.data
}

//delete equipment 
export const deleteEquipment=async(id)=>{
    const res=await apiClient.delete(`/equipment/deleteEquipment/${id}`);
    return res.data
}

//cancel order
export const cancelOrder=async(id)=>{
    const res=await apiClient.patch(`/order/cancelOrder/${id}`);
    return res.data
}

//request availability

export const requestBooking=async(data)=>{
    const res=await apiClient.post("/order/requestBooking",data)
    return res.data;
}


// orders
export const getBookedDates =async(equipmentId)=>{
    const res=await apiClient.get(`/order/getBookedDates/${equipmentId}`,
        {withCredentials : true}
    );

    return res.data;
   
}
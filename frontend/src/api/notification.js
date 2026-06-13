import apiClient from "./client";

export const getNotifications = async () => {
  const res = await apiClient.get(
    "/notification/getNotifications"
  );

  return res.data;
};

export const markAsRead = async (id) => {
  const res = await apiClient.patch(
    `/notification/markAsRead/${id}`
  );

  return res.data;
};

export const markAllAsRead = async () => {
  const res = await apiClient.patch(
    "/notification/markAllAsRead"
  );

  return res.data;
};


export const deletenotify=async(id)=>{
  const res=await apiClient.delete(`/notification/deletenotify/${id}`);
  return res.data
}
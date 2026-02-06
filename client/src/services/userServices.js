import api from "../api/api";

export const updateFeesAPI = async (fees) => {
  return await api.put("/api/user/update-fees", { fees });
};

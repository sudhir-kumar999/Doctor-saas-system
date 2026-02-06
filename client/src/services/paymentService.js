import api from "../api/api";

export const createOrderAPI = async (data) => {
  return await api.post("/api/payment/create-order", data);
};

export const getPaymentStatusAPI = async (paymentId) => {
  return await api.get(`/api/payment/status/${paymentId}`);
};

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("studentToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getProfilePhase2 = () =>
  API.get("/student/profile/phase2");

export const saveProfilePhase2 = (data) =>
  API.put("/student/profile/phase2", data);

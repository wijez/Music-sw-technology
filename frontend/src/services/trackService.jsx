import axios from "axios";
import { getCsrfToken } from "./csrf";
const BASE_URL = "http://localhost:8000/track/tracks/";

const getConfigWithCsrfToken = async () => {
  const csrfToken = await getCsrfToken();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": csrfToken,
    },
    withCredentials: true,
  };
};

export const getTracks = () => {
  return axios.get(BASE_URL, { withCredentials: true });
};

export const getTrackById = (id) => {
  return axios.get(`${BASE_URL}${id}/`, { withCredentials: true });
};

export const createTrack = async (trackData) => {
  const formData = new FormData();
  for (const key in trackData) {
    formData.append(key, trackData[key]);
  }
  const config = await getConfigWithCsrfToken();
  return axios.post(BASE_URL, formData, config);
};

export const updateTrack = async (id, trackData) => {
  const formData = new FormData();
  for (const key in trackData) {
    formData.append(key, trackData[key]);
  }
  const config = await getConfigWithCsrfToken();
  return axios.put(`${BASE_URL}${id}/update/`, formData, config);
};

export const deleteTrack = async (id) => {
  const config = await getConfigWithCsrfToken();
  return axios.delete(`${BASE_URL}${id}/delete/`, config);
};

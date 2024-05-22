import axios from 'axios';

const BASE_URL = 'http://localhost:8000/track/tracks/';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest' // Thêm dòng này vào config
  }
};

export const getTracks = () => {
    return axios.get(BASE_URL);
};

export const getTrackById = (id) => {
    return axios.get(`${BASE_URL}${id}/`);
};

export const createTrack = (trackData) => {
    const formData = new FormData();
    for (const key in trackData) {
        formData.append(key, trackData[key]);
    }
    return axios.post(BASE_URL, formData, config);
};

export const updateTrack = (id, trackData) => {
    const formData = new FormData();
    for (const key in trackData) {
        formData.append(key, trackData[key]);
    }
    return axios.put(`${BASE_URL}${id}/`, formData, config);
};

export const deleteTrack = (id) => {
    return axios.delete(`${BASE_URL}${id}/`);
};

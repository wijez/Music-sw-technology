import axios from 'axios';

// Hàm để lấy CSRF token từ cookie
const getCsrfToken = () => {
    const name = 'csrftoken';
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name)).split('=')[1];
    return cookieValue;
};

// Hàm để cấu hình axios với CSRF token
const getConfigWithCsrfToken = () => {
    const csrfToken = getCsrfToken();
    return {
        headers: {
            'X-CSRFToken': csrfToken
        },
        withCredentials: true
    };
};

const baseURL = 'http://localhost:8000/favorites/';

const favoriteService = {
    getAllFavorites: async () => {
        const config = getConfigWithCsrfToken();
        return axios.get(baseURL, config);
    },

    createFavorite: async (trackId, userId) => {
        const config = getConfigWithCsrfToken();
        return axios.post(`${baseURL}add/`, { track_id: trackId, user_id: userId }, config);
    },

    deleteFavorite: async (favoriteId) => {
        const config = getConfigWithCsrfToken();
        return axios.delete(`${baseURL}${favoriteId}/`, {withCredentials: true}, config);
    },

    checkFavorite: async (trackId) => {
        const config = getConfigWithCsrfToken();
        return axios.get(`${baseURL}check/${trackId}/`, config);
    },

    addFavorite: async (trackId) => {
        const config = getConfigWithCsrfToken();
        return axios.post(`${baseURL}add/${trackId}/`,config);
    },
};

export default favoriteService;

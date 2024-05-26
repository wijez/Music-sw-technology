import axios from "axios";

export const getCsrfToken = async () => {
  const response = await axios.get("http://127.0.0.1:8000/csfr/csrf-token/", {
    withCredentials: true,
  });
  return response.data.csrfToken;
};

export const getConfigWithCsrfToken = async () => {
  try {
    const csrfToken = await getCsrfToken();
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    };
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    throw error;
  }
};

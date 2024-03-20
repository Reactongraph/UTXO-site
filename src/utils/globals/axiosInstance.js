import axios from "axios";

const axiosInstance = async (options) => {
  try {
    const { url, method = 'get', payload = null, params = null, token = null, responseType = 'json', timeout = 0 } = options;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const headers = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      url: `${baseUrl}${url}`,
      method,
      data: payload,
      params,
      headers,
      responseType,
      timeout
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Request made but no response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up request:', error.message);
    }
  }
};

export default axiosInstance;

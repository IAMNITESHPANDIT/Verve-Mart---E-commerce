import axios from "axios";
import { BASE_URL } from "./endPoints";
// Create an instance of axios

const instance = axios.create({
  baseURL: BASE_URL,
});

// Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const requestUrl = error.config.url;
    const endpoint = requestUrl.split("3000")[1];
    if (
      error.response &&
      error.response.status === 401 &&
      endpoint !== "/auth/login"
    ) {
      // sessionStorage.clear();
      // window.location.href = "/login";
    }
    console.log(requestUrl);
    return Promise.reject(error);
  }
);

// Generic function for making GET requests

async function get(endpoint, token) {
  const config = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response = await instance.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred during GET request:", error);
    // throw error;
  }
}

// Generic function for making POST requests

async function post(endpoint, body, token) {
  const config = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response = await instance.post(endpoint, body, config);
    return response?.data ? response.data : response;
  } catch (error) {
    console.error("Error occurred during POST request:", error);
    return error.error;
  }
}

// Generic function for making DELETE requests

async function del(endpoint, token) {
  const config = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response = await instance.delete(endpoint, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred during DELETE request:", error);
    // throw error;
  }
}

// Generic function for making UPDATE (PUT) requests

async function update(endpoint, body, token) {
  const config = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response = await instance.put(endpoint, body, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred during UPDATE (PUT) request:", error);
    // throw error;
  }
}

module.exports = { get, post, del, update };

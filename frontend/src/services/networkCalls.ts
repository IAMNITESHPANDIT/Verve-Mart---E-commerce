import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an instance of axios

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add a response interceptor

instance.interceptors.response.use(
  (response: AxiosResponse) => {
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
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Generic function for making GET requests

export async function get<T>(endpoint: string, token?: string): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response: AxiosResponse<T> = await instance.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred during GET request:", error);
    throw error;
  }
}

// Generic function for making POST requests

export async function post<T>(
  endpoint: string,
  body: any,
  token?: string
): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response: AxiosResponse<T> = await instance.post(
      endpoint,
      body,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred during POST request:", error);
    throw error;
  }
}

// Generic function for making DELETE requests

export async function del<T>(endpoint: string, token?: string): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response: AxiosResponse<T> = await instance.delete(endpoint, config);
    return response.data;
  } catch (error) {
    console.error("Error occurred during DELETE request:", error);
    throw error;
  }
}

// Generic function for making UPDATE (PUT) requests

export async function update<T>(
  endpoint: string,
  body: any,
  token?: string
): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  try {
    const response: AxiosResponse<T> = await instance.put(
      endpoint,
      body,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error occurred during UPDATE (PUT) request:", error);
    throw error;
  }
}

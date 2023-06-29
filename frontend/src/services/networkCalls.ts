import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Generic function for making GET requests
export async function get<T>(endpoint: string, token?: string): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  const response: AxiosResponse<T> = await axios.get(endpoint, config);
  return response.data;
}

// Generic function for making POST requests
export async function post<T>(endpoint: string, body: any, token?: string): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  const response: AxiosResponse<T> = await axios.post(endpoint, body, config);
  return response.data;
}

// Generic function for making DELETE requests
export async function del<T>(endpoint: string, token?: string): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  const response: AxiosResponse<T> = await axios.delete(endpoint, config);
  return response.data;
}

// Generic function for making UPDATE (PUT) requests
export async function update<T>(endpoint: string, body: any, token?: string): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: token ? { Authorization: `${token}` } : undefined,
  };

  const response: AxiosResponse<T> = await axios.put(endpoint, body, config);
  return response.data;
}

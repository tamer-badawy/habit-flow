import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

let localToken = null;

export const setLocalToken = (token) => {
  localToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (localToken) {
      config.headers.Authorization = `Bearer ${localToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    if (error.response?.status == 401 && !request._retry) {
      if (response.url.includes("/auth/refresh")) {
        localToken = null;
        window.dispatchEvent("force-logout");
        return Promise.reject(error);
      }
      try {
        request._retry = true;
        const refreshResponse = axios.post(
          "http://127.0.0.1:8000/api/auth/refresh",
          {},
          {
            withCredentials: true,
          },
        );
        localToken = refreshResponse.data.access_token;
        request.headers.Authorization = `Bearer ${localToken}`;
        return api(request);
      } catch (err) {
        localToken = null;
        window.dispatchEvent("force-logout");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

let localToken = null;

export const setLocalToken = (token) => {
  localToken = token;
};

let initPromise = null;
export const initAuth = () => {
  if (!initPromise) {
    initPromise = axios
      .post(
        "http://127.0.0.1:8000/api/auth/refresh",
        {},
        { withCredentials: true },
      )
      .then((response) => {
        const newToken = response.data.access_token;
        setLocalToken(newToken);
        return newToken;
      })
      .catch(() => {
        setLocalToken(null);
        return null;
      });
  }
  return initPromise;
};

initAuth();

api.interceptors.request.use(
  async (config) => {
    if (initPromise) {
      await initPromise;
    }
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
      if (error.response.url.includes("/auth/refresh")) {
        setLocalToken(null);
        window.dispatchEvent("force-logout");
        return Promise.reject(error);
      }
      try {
        request._retry = true;
        const refreshResponse = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        setLocalToken(refreshResponse.data.access_token);
        request.headers.Authorization = `Bearer ${localToken}`;
        return api(request);
      } catch (err) {
        setLocalToken(null);
        window.dispatchEvent("force-logout");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

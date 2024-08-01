import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.36.150.194:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://3.36.150.194:8080/api/auth/refresh-token', null, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
          },
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        console.error('Token refresh failed:', e);
        // Handle token refresh failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default api;
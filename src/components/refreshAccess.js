import axios from 'axios';

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (response.data && response.data.accessToken && response.data.refreshToken) {

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.accessToken;
    } else {
      throw new Error('Invalid response data');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Failed to refresh access token:', error.response.data.message);
      if (
        error.response.data.error === 'refresh_token_expired' ||
        error.response.data.error === 'invalid_token'
      ) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } else {
      console.error('Failed to refresh access token:', error.message);
    }
    throw error;
  }
};
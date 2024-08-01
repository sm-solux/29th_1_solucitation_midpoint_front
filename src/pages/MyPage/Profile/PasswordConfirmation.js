import React, { useState } from 'react';
import axios from 'axios';
import { refreshAccessToken } from '../../../components/refreshAccess';
import { myPageStyles } from '../../../styles/myPageStyles';

const PasswordConfirmation = ({ onConfirm }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/member/verify-pw`,
        { password: confirmPassword },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        onConfirm(response.data.tokenForDelete);
      }
      alert('비밀번호 인증되었습니다');
    } catch (error) {
      if (error.response?.status === 401 && error.response?.data?.error === 'access_token_expired') {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available.');
          }
          const newAccessToken = await refreshAccessToken(refreshToken);
          const retryResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/member/verify-pw`,
            { password: confirmPassword },
            { headers: { Authorization: `Bearer ${newAccessToken}` } }
          );

          if (retryResponse.status === 200) {
            onConfirm(retryResponse.data.tokenForDelete);
          }
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
          setErrors({ confirmPassword: '토큰 갱신 중 오류가 발생하였습니다. 다시 시도해 주세요.' });
        }
      } else if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          if (data.errors) {
            const newErrors = {};
            data.errors.forEach(err => {
              newErrors[err.field] = err.message;
            });
            setErrors(newErrors);
          } else if (data.error) {
            setErrors({ confirmPassword: data.message });
          }
        } else if (status === 401) {
          setErrors({ accessToken: '유효하지 않은 Access Token입니다.' });
        }
      } else {
        setErrors({ confirmPassword: '비밀번호 확인 중 오류가 발생했습니다.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={myPageStyles.passwordContainer}>
      <h2 style={myPageStyles.passwordTitle}>비밀번호 확인</h2>
      <form onSubmit={handleSubmit}>
        <div style={myPageStyles.passwordInputContainer}>
          <span style={myPageStyles.passwordLabel}>기존 비밀번호</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={myPageStyles.passwordInput}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <span style={{ color: 'red', marginLeft: '10px' }}>{errors.confirmPassword}</span>
          )}
          {errors.accessToken && (
            <span style={{ color: 'red', marginLeft: '10px' }}>{errors.accessToken}</span>
          )}
        </div>
        <button type="submit" style={myPageStyles.passwordButton} disabled={loading}>
          {loading ? '확인 중...' : '다음'}
        </button>
      </form>
    </div>
  );
};

export default PasswordConfirmation;
import React, { useState } from 'react';
import { myPageStyles } from '../../../styles/myPageStyles';

const PasswordChange = ({ onChangePassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);

    const newErrors = { ...errors };
    if (value.length < 8 || value.length > 16) {
      newErrors.newPassword = '비밀번호는 8자 이상 16자 이하여야 합니다.';
    } else {
      delete newErrors.newPassword;
    }
    setErrors(newErrors);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    const newErrors = { ...errors };
    if (value !== newPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    } else {
      delete newErrors.confirmPassword;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.newPassword && !errors.confirmPassword && newPassword && confirmPassword) {
      onChangePassword(newPassword);
    }
  };

  return (
    <div style={myPageStyles.passwordContainer}>
      <h2 style={myPageStyles.passwordTitle}>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        <div style={myPageStyles.passwordInputContainer}>
          <span style={myPageStyles.passwordLabel}>새 비밀번호</span>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            style={myPageStyles.passwordInput}
          />
          {errors.newPassword && (
            <span style={{ color: 'red', marginLeft: '10px' }}>{errors.newPassword}</span>
          )}
        </div>
        <div style={myPageStyles.passwordInputContainer}>
          <span style={myPageStyles.passwordLabel}>새 비밀번호 확인</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={myPageStyles.passwordInput}
          />
          {errors.confirmPassword && (
            <span style={{ color: 'red', marginLeft: '10px' }}>{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" style={myPageStyles.passwordButton}>변경</button>
      </form>
    </div>
  );
};

export default PasswordChange;
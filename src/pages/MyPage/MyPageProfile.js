import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/global.css';
import { myPageStyles } from '../../styles/myPageStyles';
import { Timer } from '../../components/CommonComponents';

const MyPageProfile = ({ profileData, setProfileData }) => {
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [passwordConfirmationMode, setPasswordConfirmationMode] = useState(false);
  const [deleteConfirmationMode, setDeleteConfirmationMode] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    setPasswordEditMode(false);
    setShowTimer(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setPasswordEditMode(false);
    setShowTimer(false);
  };

  const handleDeleteAccount = () => {
    setPasswordConfirmationMode(true);
  };

  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const togglePasswordEditMode = () => {
    setPasswordEditMode(true);
  };

  const handleRequestVerification = () => {
    setShowTimer(true);
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 1000);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerification = () => {
    alert('인증 코드가 확인되었습니다.');
  };

  const handlePasswordConfirmation = (confirmPassword) => {
    if (profileData.password === confirmPassword) {
      console.log('맞아요');
      setPasswordConfirmationMode(false);
      setDeleteConfirmationMode(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleDeleteConfirm = () => {
    alert('탈퇴 됐습니다.');
    navigate('/'); // 홈 화면으로 가면서 logo가 변경 되는 건 안됐음
  };

  if (passwordConfirmationMode) {
    return (
      <PasswordConfirmation onConfirm={handlePasswordConfirmation} />
    );
  }

  if (deleteConfirmationMode) {
    return (
      <div style={myPageStyles.deleteConfirmationContainer}>
        <h2 style={myPageStyles.deleteConfirmationTitle}>미드포인트 탈퇴</h2>
        <p style={myPageStyles.deleteConfirmationMessage}>
          정말 탈퇴하시겠습니까? 탈퇴 시 되돌릴 수 없습니다. 신중하게 결정해주세요.
        </p>
        <button
          style={myPageStyles.deleteButton}
          onClick={handleDeleteConfirm}
        >
          탈퇴
        </button>
      </div>
    );
  }

  return (
    <div style={myPageStyles.profileContainer}>
      {['name', 'nickname', 'email'].map((field) => (
        <div key={field} style={myPageStyles.profileItem}>
          <span style={myPageStyles.profileLabel}>
            {field === 'name' ? '이름' : field === 'nickname' ? '닉네임' : '이메일'}
          </span>
          {editMode ? (
            <div style={myPageStyles.profileEditContainer}>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                style={myPageStyles.profileEditText}
                value={profileData[field]}
                onChange={handleInputChange}
              />
              {field === 'email' && (
                <button style={myPageStyles.profileButton} onClick={handleRequestVerification}>인증요청</button>
              )}
            </div>
          ) : (
            <div style={myPageStyles.profileText}>{profileData[field]}</div>
          )}
        </div>
      ))}
      <div style={myPageStyles.profileItem}>
        <span style={myPageStyles.profileLabel}>비밀번호</span>
        {passwordEditMode ? (
          <div style={myPageStyles.profileEditContainer}>
            <input
              type="password"
              name="password"
              style={myPageStyles.profileEditText}
              value={profileData.password}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div style={myPageStyles.profileText}>
            {'*'.repeat(profileData.password.length)}
          </div>
        )}
        {editMode && !passwordEditMode && (
          <button style={myPageStyles.profileButton} onClick={togglePasswordEditMode}>
            비밀번호 변경
          </button>
        )}
      </div>
      <div style={myPageStyles.profilePictureItem}>
        <div style={myPageStyles.profileLabel}>프로필 사진</div>
        <div>
          <img
            src={profileData.profileImage}
            alt="프로필 사진"
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px', cursor: editMode ? 'pointer' : 'default' }}
            onClick={handleImageClick}
          />
          <input
            type="file"
            name="profileImage"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
      {showTimer && (
        <div style={myPageStyles.verificationContainer}>
          <span style={myPageStyles.profileLabel} >인증코드</span>
          <input
            type="text"
            name="verificationCode"
            style={myPageStyles.passwordCodeInput}
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
          <Timer isActive={true} resetTimer={resetTimer} />
          <button style={myPageStyles.profileButton} onClick={handleRequestVerification}>재전송</button>
          <button style={myPageStyles.profileButton} onClick={handleVerification}>인증확인</button>
        </div>
      )}
      <div style={myPageStyles.buttonContainer}>
        {editMode ? (
          <>
            <button onClick={handleSave} style={myPageStyles.profileButtonEdit}>
              완료
            </button>
            <button onClick={handleCancel} style={myPageStyles.profileButtonCancel}>
              취소
            </button>
          </>
        ) : (
          <>
            <button onClick={toggleEditMode} style={myPageStyles.profileButtonEdit}>
              편집
            </button>
            <button onClick={handleDeleteAccount} style={myPageStyles.profileButtonQuit}>
              탈퇴
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPageProfile;

const PasswordConfirmation = ({ onConfirm }) => {
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(confirmPassword);
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
          />
        </div>
        <button type="submit" style={myPageStyles.passwordButton}>다음</button>
      </form>
    </div>
  );
};

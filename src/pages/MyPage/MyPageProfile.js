import React, { useState, useRef } from 'react';
import '../../styles/global.css';
import { myPageStyles } from '../../styles/myPageStyles';
import { Timer } from '../../components/CommonComponents';

const MyPageProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '김눈송',
    nickname: '솔룩션짱짱최고',
    email: 'soluxion@sookmyung.ac.kr',
    password: '12345678',
    profileImage: '../img/default-profile.png',
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const fileInputRef = useRef(null);

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

  // 탈퇴 버튼 함수
  const handleDeleteAccount = () => {
    
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
    alert('인증 코드가 확인되었습니다.'); //인증 확인 alert, 다른 방법?
  };

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
          <span style={myPageStyles.profileLabel}>인증코드</span>
          <input
            type="text"
            name="verificationCode"
            style={myPageStyles.profileEditText}
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

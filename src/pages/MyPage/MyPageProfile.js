import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/global.css';
import { myPageStyles } from '../../styles/myPageStyles';
import { Timer } from '../../components/CommonComponents';

const MyPageProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [passwordConfirmationMode, setPasswordConfirmationMode] = useState(false);
  const [deleteConfirmationMode, setDeleteConfirmationMode] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [nextMode, setNextMode] = useState(null); // 추가: 다음 모드를 저장하는 상태
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: '김눈송',
    nickname: '솔룩션짱짱최고',
    email: 'soluxion@sookmyung.ac.kr',
    password: '12345678',
    profileImage: '../img/default-profile.png',
  });

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
    if (!isEmailVerified) {
      alert('이메일을 인증하지 않았습니다.');
      return;
    }
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
    setNextMode('delete'); // 추가: 다음 모드를 'delete'로 설정
    setPasswordConfirmationMode(true);
  };

  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const togglePasswordEditMode = () => {
    setNextMode('passwordChange'); // 추가: 다음 모드를 'passwordChange'로 설정
    setPasswordConfirmationMode(true);
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
    if (verificationCode === '123456') {
      setIsEmailVerified(true);
      alert('이메일 인증이 완료되었습니다.');
    } else {
      alert('인증 코드가 올바르지 않습니다.');
    }
  };

  const handlePasswordConfirmation = (confirmPassword) => {
    if (profileData.password === confirmPassword) {
      setPasswordConfirmationMode(false);
      if (nextMode === 'delete') {
        setDeleteConfirmationMode(true); // 탈퇴 모드로 전환
      } else if (nextMode === 'passwordChange') {
        setPasswordEditMode(true); // 비밀번호 변경 모드로 전환
      }
    } else {
      setErrors({ confirmPassword: '비밀번호가 일치하지 않습니다.' });
    }
  };

  const handleDeleteConfirm = () => {
    alert('탈퇴 됐습니다.');
    navigate('/'); //로고가 바뀌는 것은 하지 못했음.
  };

  if (passwordConfirmationMode) {
    return (
      <PasswordConfirmation onConfirm={handlePasswordConfirmation} currentPassword={profileData.password} />
    );
  }

  if (passwordEditMode) {
    return (
      <PasswordChange
        onChangePassword={(newPassword) => {
          if (newPassword.length < 8 || newPassword.length > 16) {
            alert('비밀번호는 8자 이상 16자 이하여야 합니다.');
            return;
          }
          setProfileData({ ...profileData, password: newPassword });
          setPasswordEditMode(false);
          setEditMode(false);
        }}
      />
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
          <span style={myPageStyles.profileLabel}>인증 코드</span>
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

//비밀번호 확인하는 부분
const PasswordConfirmation = ({ onConfirm, currentPassword }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    const newErrors = { ...errors };
    if (value !== currentPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    } else {
      delete newErrors.confirmPassword;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.confirmPassword && confirmPassword === currentPassword) {
      onConfirm(confirmPassword);
    } else {
      setErrors({ confirmPassword: '비밀번호가 일치하지 않습니다.' });
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
          />
          {errors.confirmPassword && (
            <span style={{ color: 'red', marginLeft: '10px' }}>{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" style={myPageStyles.passwordButton}>다음</button>
      </form>
    </div>
  );
};

//비밀번호 변경 하는 부분
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

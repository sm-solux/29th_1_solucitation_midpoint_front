import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';
import { myPageStyles } from '../../styles/myPageStyles';

const MyPageProfile = () => {
  const [state, setState] = useState({
    editMode: false,
    passwordEditMode: false,
    passwordConfirmationMode: false,
    deleteConfirmationMode: false,
    nextMode: null,
    errors: {},
  });
  const [profileData, setProfileData] = useState({
    name: '',
    nickname: '',
    id: '',
    email: '',
    profileImage: '../img/default-profile.png',
    password: '',
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://3.36.150.194:8080/api/member/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;
        setProfileData({
          name: data.name,
          nickname: data.nickname,
          id: data.loginId,
          email: data.email,
          profileImage: data.profileImage || '../img/default-profile.png',
          password: profileData.password,
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            const errorData = error.response.data;
            if (errorData.error === 'access_token_expired') {
              alert('Access Token이 만료되었습니다. 로그인 페이지로 이동합니다.');
            } else if (errorData.error === 'invalid_token') {
              alert('유효하지 않은 Access Token입니다. 로그인 페이지로 이동합니다.');
            }
            navigate('/login');
          } else {
            console.error('회원 정보를 불러오는 중 에러 발생:', error.response.data);
          }
        } else {
          console.error('회원 정보를 불러오는 중 에러 발생:', error.message);
        }
      }
    };

    fetchProfileData();
  }, [navigate]);

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

  //수정 예비 코드
  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.put('http://3.36.150.194:8080/api/member/profile', profileData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setState({ ...state, editMode: false, passwordEditMode: false });
    } catch (error) {
      console.error('프로필 저장 중 에러 발생:', error);
    }
  };

  const handleCancel = () => {
    setState({ ...state, editMode: false, passwordEditMode: false });
  };

  const handleDeleteAccount = () => {
    setState({ ...state, nextMode: 'delete', passwordConfirmationMode: true });
  };

  const togglePasswordEditMode = () => {
    setState({ ...state, nextMode: 'passwordChange', passwordConfirmationMode: true });
  };

  const handlePasswordConfirmation = (confirmPassword) => {
    if (profileData.password === confirmPassword) {
      setState({ ...state, passwordConfirmationMode: false });
      if (state.nextMode === 'delete') {
        setState({ ...state, deleteConfirmationMode: true });
      } else if (state.nextMode === 'passwordChange') {
        setState({ ...state, passwordEditMode: true });
      }
    } else {
      setState({ ...state, errors: { confirmPassword: '비밀번호가 일치하지 않습니다.' } });
    }
  };

  //탈퇴 코드
  const handleDeleteConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete('http://3.36.150.194:8080/api/member/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('탈퇴 됐습니다.');
      navigate('/');
    } catch (error) {
      console.error('계정 삭제 중 에러 발생:', error);
    }
  };

  if (state.passwordConfirmationMode) {
    return <PasswordConfirmation onConfirm={handlePasswordConfirmation} currentPassword={profileData.password} />;
  }

  if (state.passwordEditMode) {
    return (
      <PasswordChange
        onChangePassword={(newPassword) => {
          if (newPassword.length < 8 || newPassword.length > 16) {
            alert('비밀번호는 8자 이상 16자 이하여야 합니다.');
            return;
          }
          setProfileData({ ...profileData, password: newPassword });
          setState({ ...state, passwordEditMode: false, editMode: false });
        }}
      />
    );
  }

  if (state.deleteConfirmationMode) {
    return (
      <div style={myPageStyles.deleteConfirmationContainer}>
        <h2 style={myPageStyles.deleteConfirmationTitle}>계정 삭제 확인</h2>
        <p style={myPageStyles.deleteConfirmationText}>정말로 계정을 삭제하시겠습니까?</p>
        <button onClick={handleDeleteConfirm} style={myPageStyles.deleteConfirmationButton}>삭제</button>
        <button onClick={() => setState({ ...state, deleteConfirmationMode: false })} style={myPageStyles.deleteConfirmationButton}>취소</button>
      </div>
    );
  }

  return (
    <div style={myPageStyles.profileContainer}>
      <ProfileField
        field="name"
        value={profileData.name}
        editMode={state.editMode}
        handleInputChange={handleInputChange}
        placeholder="이름"
      />
      <ProfileField
        field="nickname"
        value={profileData.nickname}
        editMode={state.editMode}
        handleInputChange={handleInputChange}
        placeholder="닉네임"
      />
      <ProfileField
        field="id"
        value={profileData.id}
        editMode={false}
        handleInputChange={() => {}}
        placeholder="아이디"
      />
      <ProfileField
        field="email"
        value={profileData.email}
        editMode={state.editMode}
        handleInputChange={handleInputChange}
        placeholder="이메일"
      />
      <ProfilePassword
        password={profileData.password}
        passwordEditMode={state.passwordEditMode}
        editMode={state.editMode}
        togglePasswordEditMode={togglePasswordEditMode}
      />
      <ProfileImage
        profileImage={profileData.profileImage}
        editMode={state.editMode}
        handleFileChange={handleFileChange}
        handleImageClick={() => fileInputRef.current?.click()}
        fileInputRef={fileInputRef}
      />
      <div style={myPageStyles.buttonContainer}>
        {state.editMode ? (
          <>
            <button onClick={handleSave} style={myPageStyles.profileButtonEdit}>저장</button>
            <button onClick={handleCancel} style={myPageStyles.profileButtonCancel}>취소</button>
          </>
        ) : (
          <>
            <button onClick={() => setState({ ...state, editMode: true })} style={myPageStyles.profileButtonEdit}>편집</button>
            <button onClick={handleDeleteAccount} style={myPageStyles.profileButtonQuit}>계정 삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ field, value, editMode, handleInputChange, placeholder }) => (
  <div style={myPageStyles.profileItem}>
    <span style={myPageStyles.profileLabel}>{placeholder}</span>
    {editMode ? (
      <div style={myPageStyles.profileEditContainer}>
        <input
          type="text"
          name={field}
          style={myPageStyles.profileEditText}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </div>
    ) : (
      <div style={myPageStyles.profileText}>{value}</div>
    )}
  </div>
);

const ProfilePassword = ({ password, passwordEditMode, editMode, togglePasswordEditMode }) => (
  <div style={myPageStyles.profileItem}>
    <span style={myPageStyles.profileLabel}>비밀번호</span>
    {passwordEditMode ? (
      <div style={myPageStyles.profileEditContainer}>
        <input type="password" name="password" style={myPageStyles.profileEditText} value={password} readOnly />
      </div>
    ) : (
      <div style={myPageStyles.profileText}>{'*'.repeat(password.length)}</div>
    )}
    {editMode && !passwordEditMode && (
      <button style={myPageStyles.profileButton} onClick={togglePasswordEditMode}>비밀번호 변경</button>
    )}
  </div>
);

const ProfileImage = ({ profileImage, editMode, handleFileChange, handleImageClick, fileInputRef }) => (
  <div style={myPageStyles.profilePictureItem}>
    <div style={myPageStyles.profileLabel}>프로필 사진</div>
    <div>
      <img
        src={profileImage}
        alt="프로필 사진"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          marginTop: '10px',
          cursor: editMode ? 'pointer' : 'default',
        }}
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
);

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

export default MyPageProfile;

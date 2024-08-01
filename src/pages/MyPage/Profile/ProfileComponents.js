import React from 'react';
import { myPageStyles } from '../../../styles/myPageStyles';

export const ProfileField = ({ field, value, editMode, handleInputChange, placeholder }) => (
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

export const ProfilePassword = ({ password = '', passwordEditMode, editMode, togglePasswordEditMode }) => (
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


export const ProfileImage = ({ profileImage, editMode, handleFileChange, handleImageClick, fileInputRef }) => (
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
        onClick={editMode ? handleImageClick : undefined}
      />
      {editMode && (
        <input
          type="file"
          name="profileImage"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      )}
    </div>
  </div>
);

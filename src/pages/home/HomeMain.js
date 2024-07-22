import React, { useState } from "react";
import axios from "axios";
import { commonStyles } from "../../styles/styles";
import { Logo } from "../../components/CommonComponents";
import HomePopup from "./HomePopup";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [addressInputs, setAddressInputs] = useState([
    { profile: "/img/default-profile.png", name: "솔룩션짱짱최고" },
  ]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddInput = () => {
    setAddressInputs([
      ...addressInputs,
      { profile: "/img/default-profile.png", name: "@솔룩스" },
    ]);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePurposeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPurpose(selectedValue);
    if (selectedValue === "/test1") {
      navigate("/test1");
    }
  };

  const handleFindPlace = async () => {
    try {
      // 중간지점 찾기
      const logicResponse = await axios.post('/api/logic', {
        addressInputs
      });

      if (logicResponse.data.success) {
        // 중간지점 근처 장소 찾기
        const placesResponse = await axios.get('/api/places', {
          params: {
            midpoint: logicResponse.data.midpoint,
            purpose: selectedPurpose
          }
        });

        if (placesResponse.data.success && placesResponse.data.places.length > 0) {
          navigate("/midpoint");
        } else {
          navigate("/again");
        }
      } else {
        navigate("/again");
      }
    } catch (error) {
      console.error("Error finding place:", error);
      navigate("/again");
    }
  };

  const purposes = [
    { label: "목적 추천 TEST", value: "/test1" },
    { label: "맛집", value: "/restaurant" },
    { label: "카페", value: "/cafe" },
    { label: "산책/등산", value: "/hiking" },
    { label: "공부", value: "/study" },
    { label: "문화생활", value: "/culture" },
    { label: "핫플", value: "/hotplace" },
    { label: "친목", value: "/social" },
  ];

  return (
    <div style={commonStyles.container}>
      <Logo />
      <div style={commonStyles.content}>
        {addressInputs.map((input, index) => (
          <div key={index} style={commonStyles.inputContainer}>
            <div style={commonStyles.profileContainer}>
              <img
                src={input.profile}
                alt="프로필 이미지"
                style={commonStyles.profileImg}
              />
              <span style={commonStyles.profileName}>{input.name}</span>
            </div>
            <div style={commonStyles.inputGroup}>
              <input
                type="text"
                placeholder="주소를 입력하세요"
                style={commonStyles.inputField}
                onClick={handlePopupOpen}
              />
              <button type="button" style={commonStyles.submitButton}>
                검색
              </button>
            </div>
          </div>
        ))}
        <div style={commonStyles.addButton} onClick={handleAddInput}></div>
        <div style={commonStyles.destination}>
          <select
            value={selectedPurpose}
            onChange={handlePurposeChange}
            style={commonStyles.selectField}
          >
            <option value="" disabled hidden>
              목적을 선택하세요
            </option>
            {purposes.map((purpose, index) => (
              <option key={index} value={purpose.value}>
                {purpose.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="button"
            style={commonStyles.placeButton}
            onClick={handleFindPlace}
          >
            장소 찾기
          </button>
        </div>
      </div>
      {isPopupOpen && <HomePopup onClose={handlePopupClose} />}
    </div>
  );
};

export default Home;

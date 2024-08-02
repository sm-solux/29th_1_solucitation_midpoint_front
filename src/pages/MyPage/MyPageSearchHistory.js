import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../components/refreshAccess';
import { myPageStyles } from '../../styles/myPageStyles';

const MyPageSearchHistory = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 가상 데이터 사용
    const dummyData = [
        {
            neighborhood: "청파동",
            searchTime: '2024.06.24',
            places: [
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
            ],
        },
        {
            neighborhood: "청파동",
            searchTime: '2024.03.02',
            places: [
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
                {
                    imageUrl: 'https://via.placeholder.com/50',
                    placeName: '상호명',
                    placeAddress: '서울특별시 용산구 청파대로101층',
                },
            ],
        },
    ];

    const fetchData = async (accessToken) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search-history-v2`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            setData(response.data);
        } catch (err) {
            if (err.response?.status === 401 && err.response?.data?.error === 'access_token_expired') {
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) {
                        throw new Error('No refresh token available.');
                    }
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    localStorage.setItem('accessToken', newAccessToken);
                    fetchData(newAccessToken);
                } catch (refreshError) {
                    console.error('Failed to refresh access token:', refreshError);
                    setError('토큰 갱신 중 오류가 발생하였습니다. 다시 시도해 주세요.');
                }
            } else {
                handleErrors(err);
            }
        }
    };

    const handleErrors = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
                    navigate('/login');
                    break;
                case 404:
                    setError('사용자를 찾을 수 없습니다.');
                    break;
                case 500:
                    setError('검색 기록 조회 중 오류가 발생하였습니다.');
                    break;
                default:
                    setError('데이터를 가져오는 중 오류가 발생하였습니다.');
            }
        } else {
            setError('데이터를 가져오는 중 오류가 발생하였습니다.');
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError('로그인이 필요합니다.');
            navigate('/login');
        } else {
            fetchData(accessToken); // 실제 API 호출
            // setData(dummyData); // 가상 데이터 설정
        }
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={data.length === 0 ? myPageStyles.historyContainerEmpty : myPageStyles.historyContainer}>
            {data.length === 0 ? (
                <div style={myPageStyles.historyNone}>검색한 기록이 없습니다.</div>
            ) : (
                data.map((rec, index) => (
                    <div style={myPageStyles.dateSection} key={index}>
                        <div style={myPageStyles.dateColumn}>{rec.searchTime}</div>
                        <div style={myPageStyles.recommendationContainer}>
                            <div style={myPageStyles.neighborhoodTitle}>{rec.neighborhood} 장소 추천</div>
                            <div style={myPageStyles.recommendationList}>
                                {rec.places.map((place, idx) => (
                                    <div key={idx} style={myPageStyles.recommendationItemContainer}>
                                        <div
                                            style={{
                                                ...myPageStyles.recommendationItem,
                                                ...(idx === rec.places.length - 1 ? myPageStyles.recommendationItemLastChild : {}),
                                            }}
                                        >
                                            <img
                                                src={place.imageUrl}
                                                alt="place"
                                                style={myPageStyles.itemImage}
                                            />
                                            <div style={myPageStyles.itemContent}>
                                                <div style={myPageStyles.itemTitle}>
                                                    {place.placeName}
                                                </div>
                                                <div style={myPageStyles.itemAddress}>
                                                    {place.placeAddress}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={myPageStyles.shareColumn}>
                            <div>공유</div>
                            <img src="../img/katokshare.png" style={myPageStyles.shareIcon} alt="kakaoshare" />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyPageSearchHistory;
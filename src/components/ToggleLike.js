import { useState, useCallback } from 'react';
import axios from 'axios';

const useToggleLike = (postId, initialLiked = false, initialLikeCount = 0) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState(null);

  const toggleLike = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
      }

      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likes`,
        {},
        { headers }
      );

      if (response.status === 200) {
        setLiked(prevLiked => !prevLiked);
        setLikeCount(prevLikeCount => (liked ? prevLikeCount - 1 : prevLikeCount + 1));
      }
    } catch (error) {
      console.error('Error toggling like', error);
      const errorMessage = error.response ? error.response.data : error.message;

      switch (error.response?.status) {
        case 401:
          setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
          break;
        case 404:
          setError(errorMessage);
          break;
        case 500:
          setError(`좋아요 상태를 변경하는 중 오류가 발생하였습니다. 에러 메시지: ${errorMessage}`);
          break;
        default:
          setError(`오류가 발생하였습니다: ${errorMessage}`);
      }
    }
  }, [postId, liked]);

  return { liked, likeCount, toggleLike, error };
};

export default useToggleLike;
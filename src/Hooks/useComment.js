import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchComments, fetchCommentByProductId } from '../Features/comment/commentSlice';

const useComment = (productId) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  useEffect(() => {
    if (productId) {
      dispatch(fetchCommentByProductId(productId));
    } else {
      dispatch(fetchComments());
    }
  }, [dispatch, productId]);

  return { comments, loading, error };
};

export default useComment;

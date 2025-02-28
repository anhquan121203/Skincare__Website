import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../Features/comment/commentSlice';
import { useEffect } from 'react';

const useComment = () => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return { comments, loading, error};
  
};

export default useComment;


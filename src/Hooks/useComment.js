import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCommentByProductId } from "../Features/comment/commentSlice";

const useComment = (productId) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  useEffect(() => {
    if (productId) {
      dispatch(fetchCommentByProductId(productId));
    }
  }, [dispatch, productId]);

  return { comments, loading, error };
};

export default useComment;

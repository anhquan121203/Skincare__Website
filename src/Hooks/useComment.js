import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createComment, fetchCommentByProductId } from "../Features/comment/commentSlice";

const useComment = (productId) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  useEffect(() => {
    if (productId) {
      dispatch(fetchCommentByProductId(productId));
    }
  }, [dispatch, productId]);

  const addNewComment = (comment) => {
    dispatch(createComment(comment))
  }

  return { comments, loading, error, addNewComment };
};

export default useComment;

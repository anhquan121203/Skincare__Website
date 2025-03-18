import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createComment, fetchCommentByProductId, removeComment } from "../Features/comment/commentSlice";

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

  const deleteComment = (id) => {
    dispatch(removeComment(id));
  }

  return { comments, loading, error, addNewComment, deleteComment };
};

export default useComment;

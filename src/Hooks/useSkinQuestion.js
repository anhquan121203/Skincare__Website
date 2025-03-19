import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSkinQuestion,
  fetchSkinQuestion,
} from "../Features/skinQuestion/skinQuestionSlice";

const useSkinQuestion = () => {
  const dispatch = useDispatch();
  const { skinQuestion, loading, error } = useSelector(
    (state) => state.skinQuestion
  );

  useEffect(() => {
    dispatch(fetchSkinQuestion());
  }, [dispatch]);

  const addNewSkinQuestion = async (skinQuestion) => {
    await dispatch(createSkinQuestion(skinQuestion));
    dispatch(fetchSkinQuestion());
  };

  return { skinQuestion, loading, error, addNewSkinQuestion };
};

export default useSkinQuestion;

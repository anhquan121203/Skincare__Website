import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSkinQuestion,
  deleteSkinQuestion,
  fetchSkinQuestion,
  updateSkinQuestion,
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

  const editSkinQuestion = async (skinQuestion) => {
    await dispatch(updateSkinQuestion(skinQuestion));
    dispatch(fetchSkinQuestion());
  };

  const removeSkinQuestion = async (id) => {
    await dispatch(deleteSkinQuestion(id));
    dispatch(fetchSkinQuestion());
  }

    // const removeSkinQuestion = (id) => dispatch(deleteSkinQuestion(id));

  return { skinQuestion, loading, error, addNewSkinQuestion, editSkinQuestion, removeSkinQuestion };
};

export default useSkinQuestion;

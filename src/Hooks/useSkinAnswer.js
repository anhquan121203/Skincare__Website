import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSkinAnswer,
  deleteSkinAnswer,
  fetchSkinAnswer,
  updateSkinAnswer,
} from "../Features/skinAnswer/skinAnswerSlice";

const useSkinAnswer = () => {
  const dispatch = useDispatch();
  const { skinAnswer, loading, error } = useSelector(
    (state) => state.skinAnswer
  );

  useEffect(() => {
    dispatch(fetchSkinAnswer());
  }, [dispatch]);

  const addNewSkinAnswer = async (skinAnswer) => {
    await dispatch(createSkinAnswer(skinAnswer));
    dispatch(fetchSkinAnswer());
  };

  const editSkinAnswer = async (skinAnswer) => {
    await dispatch(updateSkinAnswer(skinAnswer));
    dispatch(fetchSkinAnswer());
  };
  const removeSkinAnswer = async (id) => {
    await dispatch(deleteSkinAnswer(id));
    dispatch(fetchSkinAnswer());
  };

  return {
    skinAnswer,
    loading,
    error,
    addNewSkinAnswer,
    editSkinAnswer,
    removeSkinAnswer,
  };
};

export default useSkinAnswer;

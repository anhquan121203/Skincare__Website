import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSkinType,
  fetchSkinType,
  removeSkinType,
  updateSkinType,
} from "../Features/skinType/skinTypeSlice";

const useSkinType = () => {
  const dispatch = useDispatch();
  const { skinTypes, loading, error } = useSelector((state) => state.skinType);

  useEffect(() => {
    if (skinTypes.length === 0) {
      dispatch(fetchSkinType());
    }
  }, [dispatch, skinTypes.length]);

  const addNewSkinType = async (skinTypes) => {
    try {
      await dispatch(createNewSkinType(skinTypes));
      dispatch(fetchSkinType());
    } catch (error) {
      console.error("Error adding skin type:", error);
    }
  };
  const editSkinType = async (skintype) => {
    await dispatch(updateSkinType(skintype));
    dispatch(fetchSkinType());
  };
  const deleteSkinTyle = (id) => dispatch(removeSkinType(id));

  return {
    skinTypes,
    loading,
    error,
    addNewSkinType,
    editSkinType,
    deleteSkinTyle,
  };
};

export default useSkinType;

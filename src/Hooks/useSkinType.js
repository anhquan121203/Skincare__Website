import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewSkinType, fetchSkinType } from "../Features/skinType/skinTypeSlice";

const useSkinType = () => {
  const dispatch = useDispatch();
  const { skinTypes, loading, error } = useSelector((state) => state.skinType);

  useEffect(() => {
    dispatch(fetchSkinType());
  }, [dispatch]);

  // const addNewSkinType = async (skinTypes) => {
  //   try {
  //     await dispatch(createNewSkinType(skinTypes));
  //     dispatch(fetchSkinType());
  //   } catch (error) {
  //     console.error("Error adding skin type:", error);
  //   }
  // }

  return { skinTypes, loading, error };
};

export default useSkinType;

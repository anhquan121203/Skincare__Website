import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSkinTest } from "../Features/skinTest/skinTestSlice";

const useSkinTest = () => {
  const dispatch = useDispatch();
  const { skinTest, loading, error } = useSelector((state) => state.skinTest);

  const addNewSkinTest = async (skinTest) => {
    await dispatch(createSkinTest(skinTest));
  };

  return { skinTest, loading, error, addNewSkinTest };
};

export default useSkinTest;

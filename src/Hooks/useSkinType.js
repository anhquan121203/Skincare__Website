import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkinType } from "../Features/skinType/skinTypeSlice";

const useSkinType = () => {
  const dispatch = useDispatch();
  const { skinTypes, loading, error } = useSelector((state) => state.skinType);

  useEffect(() => {
    dispatch(fetchSkinType());
  }, [dispatch]);

  return { skinTypes, loading, error };
};

export default useSkinType;

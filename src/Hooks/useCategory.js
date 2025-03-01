import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../Features/category/categorySlice";

const useCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return { categories, loading, error };
};

export default useCategory;

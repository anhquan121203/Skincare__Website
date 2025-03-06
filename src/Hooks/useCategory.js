import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createCategory,
  fetchCategory,
  removeCategory,
  updateCategory,
} from "../Features/category/categorySlice";

const useCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const addCategory = (category) => {
    dispatch(createCategory({ category }));
  };
  const editCategory = async (category) => {
    await dispatch(updateCategory({ category }));
    dispatch(fetchCategory()); // Fetch lại danh sách danh mục sau khi cập nhật
  };

  const deleteCategory = (id) => dispatch(removeCategory(id));

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    deleteCategory,
  };
};

export default useCategory;

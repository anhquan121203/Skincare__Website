import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Features/product/productSlice";
import { useEffect } from "react";

const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addProduct = async (product) => {
    try {
      await dispatch(createProduct(product));
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const editProduct = async (product) => {
    try {
      await dispatch(updateProduct(product)); 
      dispatch(fetchProducts()); 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  

  const removeProduct = async (id) => {
    if (!id) {
      console.error("Error: ID is undefined");
      return;
    }
    try {
      await dispatch(deleteProduct(id));
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  return { products, loading, error, addProduct, editProduct, removeProduct };
};

export default useProduct;

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct as removeProduct,
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
  

  const deleteProduct = (id) => dispatch(removeProduct(id));

  return { products, loading, error, addProduct, editProduct, deleteProduct };
};

export default useProduct;

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

  const productNameExist = (productName) => {
    return products.find((product) => product.productName === productName) !== undefined;
  }

  const addProduct = async (product) => {
    try {
      if(productNameExist(product.productName)){
        throw new Error("Sản phẩm đã tồn tại. Vui lòng nhập sản phẩm khác!");
      }

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

  const compareProducts = (id1, id2) => {
    const product1 = products.find((product) => product.id === id1);
    const product2 = products.find((product) => product.id === id2);
  
    if (!product1 || !product2) {
      return { error: "Một hoặc cả hai sản phẩm không tồn tại" };
    }
  
    return {
      product1,
      product2,
    };
  };

  return { products, loading, error, addProduct, editProduct, removeProduct, productNameExist, compareProducts };
};

export default useProduct;

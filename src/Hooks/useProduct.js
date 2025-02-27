import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, removeProduct } from '../Features/product/productSlice';
import { useEffect } from 'react';

const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addProduct = (product) => dispatch(createProduct(product));
  const editProduct = (id, product) => dispatch(updateProduct({ id, product }));
  const deleteProduct = (id) => dispatch(removeProduct(id));

  return { products, loading, error, addProduct, editProduct, deleteProduct };
};

export default useProduct;


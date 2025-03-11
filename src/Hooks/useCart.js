import useSelection from "antd/es/table/hooks/useSelection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createProductIntoCart,
  fetchCartProduct,
} from "../Features/cart/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelection((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartProduct());
  }, [dispatch]);

  const addToCartfromProduct = (productId, quantity) => {
    dispatch(createProductIntoCart({ productId, quantity }));
  };

  return { carts, loading, error, addToCartfromProduct };
};

export default useCart;

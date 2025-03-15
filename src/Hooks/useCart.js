import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createProductIntoCart,
  fetchCartProduct,
  removeProductFromCart,
  paymentt,
} from "../Features/cart/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartProduct());
  }, [dispatch]);

  const addToCartfromProduct = async (id, quantity) => {
    try {
      const productId = parseInt(id, 10);
      console.log("Adding to cart:", { productId, quantity });

      await dispatch(createProductIntoCart({ productId, quantity }));
      dispatch(fetchCartProduct());
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteCart = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const payment = async (orderDetailsIds) => {
    const resultAction = await dispatch(paymentt(orderDetailsIds));
    return resultAction.payload; // Trả về response từ API
  };

  return { carts, loading, error, addToCartfromProduct, deleteCart, payment };
};

export default useCart;

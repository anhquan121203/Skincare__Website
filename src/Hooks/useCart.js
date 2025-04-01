import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createProductIntoCart,
  fetchCartProduct,
  removeProductFromCart,
  checkout,
  canceled,
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

  const payment = async (orderDetailsIds, totalPrice) => {
    try {
      const resultAction = await dispatch(
        checkout({ orderDetailsIds, totalPrice }) // Gửi cả ID sản phẩm và tổng tiền
      );

      return resultAction.payload; // Trả về phản hồi từ API
    } catch (error) {
      console.error("Payment failed:", error);
      return null;
    }
  };

  const canceledOrder = async (orderId, totalPrice, status) => {
    try {
      const resultAction = await dispatch(
        canceled({ orderId, totalPrice, status })
      ); // Gửi cả ID sách thông và tổng tiền
      return resultAction.payload; // Trả về phản hồi từ API
    } catch (error) {
      console.error("Error cancelling order:", error);
      return null;
    }
  };

  return {
    carts,
    loading,
    error,
    addToCartfromProduct,
    deleteCart,
    payment,
    canceledOrder,
  };
};

export default useCart;

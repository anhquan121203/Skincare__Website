import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import {
  fetchOrder,
  // getOrderById,
  updateOrder,
  deleteOrder,
} from "../Features/order/orderSlice";

const useOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  // Lấy đơn hàng theo ID
  // const fetchOrderById = useCallback(
  //   (id) => {
  //     dispatch(getOrderById(id));
  //   },
  //   [dispatch]
  // );

  // Cập nhật đơn hàng
  const modifyOrder = useCallback(
    (orderData) => {
      dispatch(updateOrder(orderData));
    },
    [dispatch]
  );

  // Xóa đơn hàng
  const removeOrder = useCallback(
    (id) => {
      dispatch(deleteOrder(id));
    },
    [dispatch]
  );

  return { orders, loading, error, modifyOrder, removeOrder };
};

export default useOrder;

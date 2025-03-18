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
  const editOrder = async (category) => {
    await dispatch(updateOrder(category));
    dispatch(fetchOrder()); // Fetch lại danh sách danh mục sau khi cập nhật
  };

  // Xóa đơn hàng
  const removeOrder = useCallback(
    (id) => {
      dispatch(deleteOrder(id));
    },
    [dispatch]
  );

  return { orders, loading, error, editOrder, removeOrder };
};

export default useOrder;

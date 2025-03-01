import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrder } from "../Features/order/orderSlice";

const useOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return { orders, loading, error };
};

export default useOrder;

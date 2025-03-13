import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderDetails } from "../Features/OrderDetails/orderDetailSlice";


const useOrderDetails = () => {
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(fetchOrderDetails());
  }, [dispatch]);

  return { orderDetails, loading, error };
};

export default useOrderDetails;

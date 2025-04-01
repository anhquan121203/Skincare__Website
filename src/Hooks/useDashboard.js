import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dashboardOrder, totalDashboard } from "../Features/dashboard/dashboardSlice";

const useDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardOrders, totalDashboardData, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardOrder());
    dispatch(totalDashboard())
  }, [dispatch]);

  return {
    dashboardOrders,
    totalDashboardData,
    loading,
    error,
  };
};

export default useDashboard;

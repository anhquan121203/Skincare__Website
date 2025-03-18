import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../Features/account/accountSlice";

const useAccount = () => {
  const dispatch = useDispatch();
  const { account, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return { account, loading, error };
};

export default useAccount;

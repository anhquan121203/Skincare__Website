import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createStaffAccount,
  getAllUsers,
  updateWallet,
} from "../Features/account/accountSlice";

const useAccount = () => {
  const dispatch = useDispatch();
  const { account, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const addNewStaff = async (account) => {
    try {
      await dispatch(createStaffAccount(account));
      dispatch(getAllUsers());
    } catch (error) {
      console.error("Error create Staff");
    }
  };

  const depositWallet = (money) => {
    dispatch(updateWallet(money));
  };
  return { account, loading, error, addNewStaff, depositWallet };
};

export default useAccount;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createStaffAccount,
  getAllUsers,
  updateUserStatus,
  updateWallet,
} from "../Features/account/accountSlice";

const useAccount = () => {
  const dispatch = useDispatch();
  const { account, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  const checkEmailExists = (email) => {
    return account.find((user) => user.email === email) !== undefined;
  }

  const addNewStaff = async (newAccount) => {
    try {

      // check  email
      if (checkEmailExists(newAccount.email)) {
        throw new Error("Email đã tồn tại. Vui lòng nhập email khác!");
      }

      await dispatch(createStaffAccount(newAccount));
      dispatch(getAllUsers());
    } catch (error) {
      console.error("Error create Staff");
    }
  };

  const depositWallet = (money) => {
    dispatch(updateWallet(money));
  };

  const banUser = async (userId, status) => {
    await updateUserStatus(use)
  }
  return { account, loading, error, addNewStaff, depositWallet, checkEmailExists };
};

export default useAccount;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchWallet } from "../Features/wallet/walletSlice";

const useWallet = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  return {
    wallet,
    loading,
    error,
  };
};

export default useWallet;

// Get me from api - FE

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.auth.avatar);

  const token =
    useSelector((state) => state.auth.accessToken) ||
    localStorage.getItem("accessToken");

  return {
    userId: user?.id,
  };
};

export default useAuth;

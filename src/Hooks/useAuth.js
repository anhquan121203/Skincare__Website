// Get me from api - FE

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar as updateAvatarAction } from "../Features/user/authSlice";
import { PROFILE_API_URL } from "../Constants/userContant";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.auth.avatar);

  const token =
    useSelector((state) => state.auth.accessToken) ||
    localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await axios.get(`${PROFILE_API_URL}/GetUserProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        // console.log(response.data)

        if (response.data.avatar) {
          dispatch(updateAvatarAction(response.data.avatar));
        }
      } catch (error) {
        console.error("Error fetch data user", error);
      }
    };
    fetchUserData();
  }, [token]);

  const updateAvatar = (newAvatarUrl) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatarUrl,
    }));
    dispatch(updateAvatarAction(newAvatarUrl));
  };

  return {
    userId: user?.id,
    avatar: avatar,
    firstName: user?.firstName,
    lastName: user?.lastName,
    address: user?.address,
    birthday: user?.birthday,
    phoneNumber: user?.phoneNumber,
    roleName: user?.roleName,
    email: user?.email,
    wallet: user?.wallet,
    updateAvatar,
    user,
  };
};

export default useAuth;

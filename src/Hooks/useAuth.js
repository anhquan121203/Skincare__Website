// Get me from api - FE

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateAvatar as updateAvatarAction} from "../Features/user/authSlice"
import { FETCH_PROFILE_API_URL } from "../Constants/userContant";

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
          if (!token){
            console.log("No token found");
            return;
          }
          const response = await axios.get(`${FETCH_PROFILE_API_URL}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(response.data)

          if (response.data.avatar){
            dispatch(updateAvatarAction(response.data.avatar))
          }
        } catch (error) {
          console.error("Error fetch data user", error)
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
    }

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
    updateAvatar,
    user,
  };
};

export default useAuth;

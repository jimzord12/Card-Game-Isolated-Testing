// import { axiosPrivate } from '../api/api';
import axiosCustom from "../../../api/apiConfig";

import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";
import { userAuthType } from "../../context/AuthContext/authTypes";
import { AxiosError } from "axios";

type responseType = {
  data: {
    accessToken: string;
  };
};

const useRefreshToken = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  interface ApiErrorResponse {
    message: string;
    errorCode: number;
  }

  const refresh = async () => {
    // console.log('From useRefreshToken Hook: Auth ', auth);
    try {
      const response: responseType = await axiosCustom.post("/refresh", {
        name: user?.username,
      });
      const newAccessToken = response.data.accessToken;
      console.log("Refresh Token -> Still Valid! 😁");
      if (setUser === null) throw new Error("setUser is null 😱");

      setUser((prev) => ({ ...prev, aT: newAccessToken } as userAuthType));

      console.log(
        "New A-JWT -> ",
        newAccessToken.slice(newAccessToken.length - 12, newAccessToken.length)
      );
      return newAccessToken;
    } catch (error) {
      // In case the Refresh Token has expired, the user is redirected to the login page
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (
        axiosError.response!.data.message.endsWith("R-JWT probably expired 😱")
      ) {
        console.log("-> 😱 The Refresh Token has Expired! 😱 <-");
        console.log("-> You must login again, to create a new one 😋 <-");
        navigate("/");
      }
    }
  };
  return refresh;
};

export default useRefreshToken;

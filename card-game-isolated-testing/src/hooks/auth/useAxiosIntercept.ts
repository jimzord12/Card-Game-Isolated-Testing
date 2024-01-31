import { useEffect } from "react";
import axiosCustom from "../../../api/apiConfig";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosIntercetps = () => {
  const refresh = useRefreshToken();
  const { user } = useAuth();
  // console.log("Running");

  useEffect(() => {
    const requestIntercept = axiosCustom.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && user?.aT) {
          config.headers["Authorization"] = `Bearer ${user.aT}`;
          // console.log(
          //   'useaxiosCustom::Request::Interceptor => Auth: ',
          //   auth.accessToken
          // );
          // console.log(
          //   "The request was Intercepted | Cause: Not Auth Headers | Adding A-JWT to Auth Headers -> ",
          //   user?.aT.slice(user?.aT.length - 12, user?.aT.length)
          // );
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // When an error is thrown, they will try to refresh the AccessToken automatically
    const responseIntercept = axiosCustom.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // console.log(
        //     'useaxiosCustom Hook -> prevRequest: ',
        //     prevRequest
        // );
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // console.log('useaxiosCustom Hook -> Error: ', error);
          prevRequest.sent = true;
          // console.log(
          //   "The Access Token Expired! Checking if Refresh Token is still valid... "
          // );
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosCustom(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosCustom.interceptors.request.eject(requestIntercept);
      axiosCustom.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, user?.aT]);

  return axiosCustom;
};

export default useAxiosIntercetps;

import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

const useGA4 = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: document.title,
    });
  }, [location]);
};

export default useGA4;

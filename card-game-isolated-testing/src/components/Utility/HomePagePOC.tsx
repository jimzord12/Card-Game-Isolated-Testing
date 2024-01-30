// import { useMediaQuery } from "@mui/material";
import { UniwaLogo, footerImg, logoGenera } from "../../assets/homePageImgs";
import SwitchBtn from "../WalletRelated/SwitchBtn";
import { Suspense, lazy, useState } from "react";
import useViewportWidthGreaterThan320 from "./useViewportWidthGreaterThan320";
// import HomePageMetamask from "../../pages/HomePage/HomePageMetamask";
// import HomePageLocalWallet from "../../pages/HomePage/HomePageLocalWallet";

const HomePageMetamask = lazy(
  () => import("../../pages/HomePage/HomePageMetamask")
);

const HomePageLocalWallet = lazy(
  () => import("../../pages/HomePage/HomePageLocalWallet")
);
// import TestDashboard from "../__TESTING__/TestDashboard";
// import { useNavigate } from 'react-router-dom';

const HomePagePOC = () => {
  // const mediaMax320 = useMediaQuery("(max-width: 320px)");
  const isGreaterThan320 = useViewportWidthGreaterThan320();
  const [usingLW, setUsingLW] = useState(false);
  // const { hardcodePlayer } = useHardcoding(); // 🧪 REMOVE THIS LINE WHEN DONE TESTING 🧪

  return (
    <div className="min-h-screen flex xl:flex-row flex-col relative ">
      {/* <TestDashboard /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
          <img
            src={logoGenera}
            alt="logo"
            className="w-[300px] h-[130px] object-contain cursor-pointer"
          />

          <div className="flex-1 flex justify-center flex-col xl:mt-16 my-16">
            <div className="flex flex-row w-full">
              <h1 className="flex flex-col font-rajdhani font-bold text-white sm:text-6xl text-4xl head-text">
                <>
                  <div className="inline">
                    {"Welcome to"}{" "}
                    <span
                      style={{
                        color: "green",
                        textShadow: "2px 2px 2px white",
                      }}
                    >
                      GENERA's
                    </span>{" "}
                  </div>
                  Energy Transition Card Game
                </>
              </h1>
            </div>
            <p
              className={`font-rajdhani font-normal text-[24px] text-siteWhite my-10`}
            >
              <>
                This is a Web3 Application. <br />
                {`Complete the steps below to gain access`} <br />
                <span style={{ fontSize: 16 }}>
                  Select{" "}
                  <span style={{ color: "limegreen", fontWeight: "bold" }}>
                    'Use Local Wallet'
                  </span>{" "}
                  for a more user-friendly experience
                </span>
              </>
            </p>
            <SwitchBtn usingLW={usingLW} setUsingLW={setUsingLW} />
            <div style={{ height: 48 }} />
            {/* HERE IS WHERE THE BRANCH BETWEEN METAMASK & LOCAL WALLET STARTS */}
            <>{usingLW ? <HomePageLocalWallet /> : <HomePageMetamask />}</>
          </div>

          <p className="font-rajdhani font-medium text-base text-white">
            <img
              src={UniwaLogo}
              alt="Uniwa Logo"
              style={{
                display: "inline-block",
                marginRight: "10px",
                width: isGreaterThan320 ? "56px" : "42px",
                height: "auto",
              }}
            />
            Made with 💙 by UNIWA{" "}
          </p>
        </div>

        <div className="flex flex-1">
          <img
            src={footerImg}
            alt="hero-img"
            className="w-full xl:h-full object-cover"
          />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePagePOC;

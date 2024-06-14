// import { useMediaQuery } from "@mui/material";
import { UniwaLogo, footerImg, logoGenera } from "../../assets/homePageImgs";
import SwitchBtn from "../../components/WalletRelated/SwitchBtn";
import { Suspense, lazy, useState } from "react";
import useViewportWidthGreaterThan320 from "../../components/Utility/useViewportWidthGreaterThan320";
import useGA4 from "../../hooks/useGA4"; 
import GameRatings from "../../components/GameRatings/GameRatings";
import Discord from "../../assets/newAdditions/Discord.webp";
import Youtube from "../../assets/newAdditions/youtube_logo.webp";
// import HomePageMetamask from "../../pages/HomePage/HomePageMetamask";
// import HomePageLocalWallet from "../../pages/HomePage/HomePageLocalWallet";

const HomePageMetamask = lazy(() => import("./HomePageMetamask"));

const HomePageLocalWallet = lazy(() => import("./HomePageLocalWallet"));
// import TestDashboard from "../__TESTING__/TestDashboard";
// import { useNavigate } from 'react-router-dom';

const HomePagePOC = () => {
  useGA4();
  // const mediaMax320 = useMediaQuery("(max-width: 320px)");
  const isGreaterThan320 = useViewportWidthGreaterThan320();
  const [usingLW, setUsingLW] = useState(false);
  // const { hardcodePlayer } = useHardcoding(); // 🧪 REMOVE THIS LINE WHEN DONE TESTING 🧪
  

  return (
    <div className="min-h-screen flex xl:flex-row flex-col relative ">
      {/* <TestDashboard /> */}
      <Suspense
        fallback={
          <div className="text-3xl w-screen h-screen flex justify-center items-center">
            Loading, Please Wait a Moment...
          </div>
        }
      >
        <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
          <img
            src={logoGenera}
            alt="logo"
            className="w-[300px] h-[130px] object-contain cursor-pointer"
          />

          <div className="flex-1 flex justify-center flex-col xl:mt-16 my-16">
            <div className="font-['Acme'] flex flex-row w-full">
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
            <p className="font-normal text-[24px] text-siteWhite mt-10 mb-6">
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
            <div className="bg-green-600 h-12 flex items-center mb-6 rounded-lg pl-2 pr-4 w-72 hover:scale-110 duration-300 cursor-pointer" onClick={() => window.open("https://www.youtube.com/playlist?list=PLA1oD0-OWjRtrm03CKf5ZGSslAUVa97cJ", '_blank')}>
              <img src={Youtube} alt="youtube" className="object-contain w-12 h-full" />
              <p className="ml-2 text-xl">Check out our Tutorials!</p>
            </div>
            <SwitchBtn usingLW={usingLW} setUsingLW={setUsingLW} />
            <div style={{ height: 48 }} />
            {/* HERE IS WHERE THE BRANCH BETWEEN METAMASK & LOCAL WALLET STARTS */}
            <>{usingLW ? <HomePageLocalWallet /> : <HomePageMetamask />}</>
          </div>

          <div className="font-rajdhani font-medium text-base text-white flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <div
                className="flex items-center hover:cursor-pointer hover:scale-110 z-[999] duration-300"
                aria-description="Discord Server Link"
                onClick={() =>
                  window.open("https://discord.gg/Wv8nzm4KW6", "_blank")
                }
              >
                <img
                  src={Discord}
                  alt="Discord Logo"
                  style={{
                    display: "inline-block",
                    marginRight: "10px",
                    width: isGreaterThan320 ? "56px" : "42px",
                    height: "auto",
                  }}
                />
                <p>Join our Discord Server</p>
              </div>
              <div className="flex items-center">
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
                <p>Made with 💙 by UNIWA </p>
              </div>
            </div>
            <div className="flex">
              <GameRatings />
            </div>
          </div>
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

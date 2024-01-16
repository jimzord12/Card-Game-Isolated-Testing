import { Button, useMediaQuery } from "@mui/material";
import { UniwaLogo, footerImg, logoGenera } from "../../assets/homePageImgs";
import SwitchBtn from "../WalletRelated/SwitchBtn";
import { useState } from "react";
import HomePageMetamask from "../../pages/HomePage/HomePageMetamask";
import HomePageLocalWallet from "../../pages/HomePage/HomePageLocalWallet";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const HomePagePOC = () => {
  const mediaMax320 = useMediaQuery("(max-width: 320px)");
  const [usingLW, setUsingLW] = useState(false);

  // const navigate = useNavigate();

  return (
    <div className="min-h-screen flex xl:flex-row flex-col relative ">
      <div className="flex xl:flex-col flex-col relative gap-4 bg-neutral-600 items-center">
        <h1 style={{ fontSize: 36 }}> 🧪 TESTING PAGES 🧪 </h1>
        <Link to="/game">
          <Button variant="contained">Go to Game</Button>
        </Link>
        <Link to="/marketplace">
          <Button variant="contained">Go to MarketPlace</Button>
        </Link>
        <Link to="/leaderboard">
          <Button variant="contained">Go to Leaderboard</Button>
        </Link>
        <h1 style={{ fontSize: 26 }}> ✨ Restore Afterwards ✨ </h1>
      </div>

      <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <img
          src={logoGenera}
          alt="logo"
          className="w-[300px] h-[130px] object-contain cursor-pointer"
          //   onClick={() => navigate('/battle')}
        />

        <div className="flex-1 flex justify-center flex-col xl:mt-16 my-16">
          <div className="flex flex-row w-full">
            <h1 className="flex flex-col font-rajdhani font-bold text-white sm:text-6xl text-4xl head-text">
              <>
                <div className="inline">
                  {"Welcome to"}{" "}
                  <span
                    style={{ color: "green", textShadow: "2px 2px 2px white" }}
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
              width: mediaMax320 ? "42px" : "56px",
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
    </div>
  );
};

export default HomePagePOC;

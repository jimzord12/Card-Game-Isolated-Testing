import BoltIcon from "@mui/icons-material/Bolt";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
// import { GiGoldBar } from "react-icons/gi";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { default as AccessibilityNewIcon } from "@mui/icons-material/Group";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { ReactSVG } from "react-svg";
import {
  concreteIcon,
  crystalIcon,
  metalIcon,
} from "../../assets/statsBarImgs";
import {
  countDigits,
  justTheBs,
  justTheKs,
  justTheMills,
} from "../../utils/game";
import "./statsBars.css";

export const useUtilsForStatsBars = () => {
  const mediaQuery360 = useMediaQuery("(min-width:360px)");
  const mediaQuery480 = useMediaQuery("(min-width:480px)");
  const mediaQuery600 = useMediaQuery("(min-width:600px)");
  const mediaQuery660 = useMediaQuery("(min-width:660px)");
  const mediaQuery760 = useMediaQuery("(min-width:760px)");
  const mediaQuery900 = useMediaQuery("(min-width:900px)");
  const mediaQuery1200 = useMediaQuery("(min-width:1200px)");

  const iconFinder = (name: string) => {
    switch (name) {
      case "gold":
        return (
          <AccountBalanceIcon fontSize={mediaQuery660 ? "medium" : "small"} />
        );

      case "population":
        return (
          <AccessibilityNewIcon fontSize={mediaQuery660 ? "medium" : "small"} />
        );

      case "energy":
        return <BoltIcon fontSize={mediaQuery660 ? "medium" : "small"} />;

      case "rank":
        return (
          <MilitaryTechIcon fontSize={mediaQuery660 ? "medium" : "small"} />
        );

      case "concrete":
        return <ReactSVG src={concreteIcon} />;

      case "metals":
        return <ReactSVG src={metalIcon} />;

      case "crystals":
        return <ReactSVG src={crystalIcon} />;

      case "diesel":
        return <OilBarrelIcon fontSize={mediaQuery660 ? "large" : "medium"} />;

      default:
        console.error("⛔ MiniTopBarV2.jsx | Error: iconFinder()");
        break;
    }
  };

  const getstylesEI = () => {
    if (mediaQuery360 && !mediaQuery480)
      return { position: "fixed", left: "5px", top: "106px" };
    if (mediaQuery480 && !mediaQuery600)
      return { position: "fixed", right: "2.5%", top: "12px" };
    if (mediaQuery600 && !mediaQuery660)
      return { position: "fixed", right: "6.5%", top: "12px" };
    if (mediaQuery660 && !mediaQuery760)
      return { position: "fixed", right: "6%", top: "12px" };
    if (mediaQuery760 && !mediaQuery900)
      return { position: "fixed", right: "1.5%", top: "12px" };
    if (mediaQuery900 && !mediaQuery1200)
      return { position: "fixed", right: "31%", top: "12px" };
    if (mediaQuery1200)
      return { position: "fixed", left: "745px", top: "12px" };
    return { position: "fixed", left: "5px", top: "100px" };
  };

  const shortenLongNum = (numberInit: number) => {
    const number = Math.round(numberInit);
    const digits = countDigits(number);

    // -- Screen: 280px - 359px --
    if (!mediaQuery360 && digits > 10) {
      return justTheBs(Math.floor(number));
    }

    if (!mediaQuery360 && digits > 7) {
      return justTheMills(Math.floor(number));
    }
    if (!mediaQuery360 && digits > 4) {
      if (countDigits(Math.floor(number)) > 4) {
        return justTheKs(Math.floor(number));
      } else return Math.floor(number);
      // if(Math.round(number) > 4)
    }

    // -- Screen: 360px - 599px --
    if (mediaQuery360 && !mediaQuery600 && digits > 9) {
      return justTheMills(Math.floor(number));
    }

    if (mediaQuery360 && !mediaQuery600 && digits > 7) {
      return justTheKs(Math.floor(number));
    }

    // -- Screen: 600px - 899px --
    if (mediaQuery600 && !mediaQuery900 && digits > 9) {
      return justTheMills(Math.floor(number));
    }
    if (mediaQuery600 && !mediaQuery900 && digits > 6) {
      return justTheKs(Math.floor(number));
    }

    // -- Screen: 900px - 1199px --
    if (mediaQuery900 && !mediaQuery1200 && digits > 11) {
      return justTheBs(Math.floor(number));
    }

    if (mediaQuery900 && !mediaQuery1200 && digits > 8) {
      return justTheMills(Math.floor(number));
    }

    if (mediaQuery900 && !mediaQuery1200 && digits > 5) {
      return justTheKs(Math.floor(number));
    }

    // -- Screen: 1200px - max --
    if (mediaQuery1200 && digits > 12) {
      return justTheBs(Math.floor(number));
    }

    if (mediaQuery1200 && digits > 9) {
      return justTheMills(Math.floor(number));
    }

    if (mediaQuery1200 && digits > 6) {
      return justTheKs(Math.floor(number));
    }
    return number;
  };

  const visibilityA = (showOtherBar: boolean, barType: string) => {
    // Width is below 600px
    // if (!mediaQuery600) {
    if (barType === "resources") {
      return showOtherBar ? "visible" : "hidden";
    } else if (barType === "stats") {
      return !showOtherBar ? "visible" : "hidden";
    } else {
      throw new Error("⛔ showOnlyOne() | Error: barType");
    }
    // }
    return "visible";
  };

  return { iconFinder, getstylesEI, shortenLongNum, visibilityA };
};

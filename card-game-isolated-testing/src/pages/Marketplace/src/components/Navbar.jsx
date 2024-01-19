import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, menu, search } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";
import { CustomButton } from "./";
import WalletAvatar from "./WalletAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  // const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const {
    playerWallet,
    cards,
    setCards,
    isActive,
    setIsActive,
    refetchAllCards,
    refetchSoldCards,
  } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(e) {
    console.log("Search Bar Input: ", e.target.value);
    setSearchTerm(e.target.value);
  }
  function handleSearchClick() {
    let convertedSearchTerm = 0;
    if (searchTerm.toLowerCase() === "wind turbine") {
      convertedSearchTerm = 1;
    } else if (searchTerm.toLowerCase() === "techstore") {
      convertedSearchTerm = 13;
    } else if (searchTerm.toLowerCase() === "workaholism") {
      convertedSearchTerm = 7;
    }
    setCards(
      cards.filter((card) => {
        console.log("Card SSDD: ", card);
        console.log(
          "convertedSearchTerm SSDD: ",
          card.templateId === convertedSearchTerm
        );
        return card.templateId === convertedSearchTerm;
      })
    );
  }

  return (
    <div className="flex sm:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex-1 flex flex-row w-full py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Enter card name (Ex. wind turbine)"
          onChange={handleChange}
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          onClick={handleSearchClick}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={"Refresh"}
          styles={"bg-[#8c6dfd]"}
          handleClick={() => {
            console.log("SKATA");
            refetchAllCards();
            refetchSoldCards();
          }}
        />

        <Link to="/profile" onClick={() => setIsActive("profile")}>
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            {/* <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            /> */}
            <WalletAvatar walletAddress={playerWallet} scale={4} />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Link to="/battle/" onClick={() => setIsActive("dashboard")}>
            <img
              src={logo}
              alt="user"
              className="w-[90%] h-[100%] object-contain"
              onClick={() => {
                navigate();
              }}
            />
          </Link>
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={"Refresh"}
              styles={"bg-[#8c6dfd]"}
              handleClick={() => {
                console.log("SKATA");
                refetchAllCards();
                refetchSoldCards();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

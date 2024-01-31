import React, { useState, useEffect } from "react";
import "./cardManager.css";
import { CardClass } from "../../../../../types";
import { isSPCard } from "../../../../../types/TypeGuardFns/SPGuards";
import { rarityConverter } from "../CardGrid/utils";

interface Props {
  cards: CardClass[];
  onFilteredCardsChange: (cards: CardClass[]) => void;
}

const CardManager = ({ cards, onFilteredCardsChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSortType(event.target.value);
  };

  const handleFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFilterType(event.target.value);
    // console.log("AAAA: ", event.target.value);
  };

  useEffect(() => {
    let filteredCards = [...cards];

    if (searchTerm !== "") {
      filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "") {
      filteredCards = filteredCards.filter(
        (card) => rarityConverter(card.rarity) == filterType
      );
    }

    if (sortType === "title") {
      filteredCards.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortType === "type") {
      filteredCards.sort((a, b) => (a.type > b.type ? 1 : -1));
    } else if (sortType === "rarity") {
      filteredCards.sort((a, b) => (b.rarity > a.rarity ? 1 : -1));
    } else if (sortType === "level") {
      filteredCards.sort((a, b) => {
        if (isSPCard(a) || isSPCard(b)) {
          return -1;
        }
        return b.level - a.level;
      });
    }

    onFilteredCardsChange(filteredCards);
  }, [searchTerm, sortType, filterType]);

  return (
    <div className="card-manager">
      <div className="card-manager-field">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by Title..."
          onChange={handleSearchChange}
        />
      </div>
      <div className="card-manager-field">
        <span className="span-header">Sort By:</span>
      </div>
      <div className="card-manager-field">
        <label>
          <input
            type="radio"
            name="sortType"
            value="title"
            checked={sortType === "title"}
            onChange={handleSortChange}
          />
          Title
        </label>
        <label>
          <input
            type="radio"
            name="sortType"
            value="type"
            checked={sortType === "type"}
            onChange={handleSortChange}
          />
          Type
        </label>
        <label>
          <input
            type="radio"
            name="sortType"
            value="rarity"
            checked={sortType === "rarity"}
            onChange={handleSortChange}
          />
          Rarity
        </label>
        <label>
          <input
            type="radio"
            name="sortType"
            value="level"
            checked={sortType === "level"}
            onChange={handleSortChange}
          />
          Level
        </label>
      </div>

      <div className="card-manager-field">
        <span className="span-header">Show:</span>
      </div>

      <div className="card-manager-field">
        <label>
          <input
            type="radio"
            name="filterType"
            value=""
            checked={filterType === ""}
            onChange={handleFilterChange}
          />
          All
        </label>
        <label
          style={{
            fontWeight: "500",
            color: "white",
            textShadow: "1px 1px 1px black",
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={"Common"}
            checked={filterType == "Common"}
            onChange={handleFilterChange}
          />
          Common
        </label>
        <label
          style={{
            fontWeight: "500",
            color: "lightgreen",
            textShadow: "1px 1px 1px black",
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={"Special"}
            checked={filterType == "Special"}
            onChange={handleFilterChange}
          />
          Special
        </label>
      </div>
      <div className="card-manager-field">
        <label
          style={{
            fontWeight: "500",
            color: "#66b7ff",
            textShadow: "1px 1px 1px black",
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={"Rare"}
            checked={filterType == "Rare"}
            onChange={handleFilterChange}
          />
          Rare
        </label>
        <label
          style={{
            fontWeight: "500",
            color: "#cc66ff",
            textShadow: "1px 1px 1px black",
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={"Mythic"}
            checked={filterType == "Mythic"}
            onChange={handleFilterChange}
          />
          Mythic
        </label>
        <label
          style={{
            fontWeight: "500",
            color: "#ff9000",
            textShadow: "1px 1px 1px black",
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={"Legendary"}
            checked={filterType == "Legendary"}
            onChange={handleFilterChange}
          />
          Legendary
        </label>
      </div>
    </div>
  );
};

export default CardManager;

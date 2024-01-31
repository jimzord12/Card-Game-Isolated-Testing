import { LazyLoadImage } from "react-lazy-load-image-component";
import "./cardCategory.css";
import React from "react";
// import "react-lazy-load-image-component/src/effects/blur.css";
interface CardCategoryProps {
  handleSimpleCardSelection: (selection: string) => void;
  image: string;
  text: string;
}

// In Old Code, was named SimpleImgCard.jsx

/**
 *
 * @description This Component is used to render a card that the User will click on to select for what category does he want to Craft a Card for.
 * @returns
 */
const CardCategory = ({
  image,
  text,
  handleSimpleCardSelection,
}: CardCategoryProps) => {
  return (
    <div
      className="craft-card"
      onClick={() => {
        if (text === "Special Effect") {
          handleSimpleCardSelection("sp");
        } else {
          handleSimpleCardSelection(text);
        }
      }}
    >
      <LazyLoadImage src={image} alt={text} />
      {/* <img src={image} alt={text} /> */}
      <div className="text">{text}</div>
    </div>
  );
};

export default React.memo(CardCategory);

import "./cardCategory.css";

interface CardCategoryProps {
  onClick: () => void;
  image: string;
  text: string;
}

// In Old Code, was named SimpleImgCard.jsx

/**
 *
 * @description This Component is used to render a card that the User will click on to select for what category does he want to Craft a Card for.
 * @returns
 */
const CardCategory = ({ image, text, onClick }: CardCategoryProps) => {
  return (
    <div className="craft-card" onClick={onClick}>
      <img src={image} alt={text} />
      <div className="text">{text}</div>
    </div>
  );
};

export default CardCategory;

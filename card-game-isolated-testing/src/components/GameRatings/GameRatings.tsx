import { useState, useEffect } from "react";
import FilledStar from "../../assets/newAdditions/star-fill.webp";
import EmptyStar from "../../assets/newAdditions/star-empty.webp";
import GoogleFormIMG from "../../assets/newAdditions/Google_Form_IMG.webp";
import { getRatings } from "../../../api/apiFns";
import { SurveyResponse } from "../../types/GoogleSurvey/SurveyType";

const surveyURL =
  "https://docs.google.com/forms/d/e/1FAIpQLScC2ZIyRY5YM0IAGkI9oWUxqcc2xQriQeK5wRtndEywrnLJyA/viewform?usp=sf_link";

const GameRatings = () => {
  const [reviews, setReviews] = useState<SurveyResponse[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    getRatings()
      .then((reviews) => {
        setReviews(reviews);
        calculateAverageRating(reviews);
      })
      .catch((err) => {
        console.log("⛔ (GameRatings.tsx): " + err);
      });
  }, []);

  const  calculateAverageRating = (reviews: SurveyResponse[]) => {
    const total = reviews.reduce((acc, review) => acc + review.question_10, 0);
    const average = total / reviews.length;
    const rounded = Math.round((average + Number.EPSILON) * 100) / 100
    setAverageRating(rounded);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      //   const width = Math.max(0, Math.min(100, (averageRating - (i - 1)) * 100));
      const widthPercent = Math.max(
        0,
        Math.min(100, (averageRating - (i - 1)) * 100)
      );
      stars.push(
        <div className="relative w-8 h-8 inline-block" key={i}>
          <img
            src={EmptyStar}
            alt="Empty star"
            className="absolute inset-0 w-full h-full"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            // style={{ width: `${widthPercent}%` }}
          >
            <img
              src={FilledStar}
              alt="Filled star"
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                width: "100%",
                position: "absolute",
                left: "0",
                top: "0",
                clipPath: "inset(0 " + (100 - widthPercent) + "% 0 0)",
              }}
            />
          </div>
        </div>
      );
    }
    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <div
      className="flex hover:cursor-pointer z-[999] font-mono hover:scale-110 duration-300"
      onClick={() => window.open(surveyURL, "_blank")}
    >
      <div className="w-16">
        <img
          className="w-full h-full object-contain"
          src={GoogleFormIMG}
          alt="Google Form Img"
        />
      </div>
      <div>
        {renderStars()}
        <div className="flex justify-center mt-2 text-lg md:text-3xl">
          {averageRating}/5 ({reviews.length})
        </div>
      </div>
    </div>
  );
};

export default GameRatings;

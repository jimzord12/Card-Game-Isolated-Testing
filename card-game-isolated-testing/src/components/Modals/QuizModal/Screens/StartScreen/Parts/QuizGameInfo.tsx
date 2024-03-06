const QuizGameInfo = () => {
  return (
    <>
      <div className="h-[65%] mt-4 mx-4 overflow-scroll border-2 rounded-md">
        <h2 className="font-Rocher text-center text-emerald-400 drop-shadow-lg underline underline-offset-2 largeMobile:text-lg tablet:text-2xl">
          {" "}
          &diams; Game Information &diams;
        </h2>
        <div className="mt-2 text-xs leading-6 largeMobile:text-sm tablet:text-lg">
          <p className="indent-4 drop-shadow-md">
            1. You don't lose anything if you fail in this mini game.
          </p>
          <p className="indent-4 drop-shadow-md">
            2. You have 10-20 seconds to answer each question, depending on its
            length.
          </p>
          <p className="indent-4 drop-shadow-md">
            3. When answering incorrectly, a heart is lost.
          </p>
          <p className="indent-4 drop-shadow-md">
            4. If you lose all hearts (top-left), the game ends.
          </p>
          <p className="indent-4 drop-shadow-md">
            5. The Stars on the top right represent the Rewards.
          </p>
          <p className="indent-4 drop-shadow-md">
            6. You can also win the game, by collecting 3 Stars.
          </p>
          <p className="indent-4 drop-shadow-md">
            7. Finally, depending on the collected Stars, you will be rewarded a
            Resource Refund.
          </p>
          <h2 className="font-Rocher text-sm text-emerald-400 text-center drop-shadow-lg underline underline-offset-2 mt-4 largeMobile:text-lg tablet:text-2xl">
            {" "}
            The End
          </h2>
        </div>
      </div>
    </>
  );
};

export default QuizGameInfo;

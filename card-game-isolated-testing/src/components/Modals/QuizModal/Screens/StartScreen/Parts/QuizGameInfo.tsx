const QuizGameInfo = () => {
  return (
    <>
      <div className="h-[65%] mt-4 mx-4 overflow-scroll border-2 rounded-md">
        <h2 className="font-Rocher text-center text-emerald-400 drop-shadow-lg underline underline-offset-2 text-lg largeMobile:text-xl tablet:text-3xl largeScreen:text-5xl">
          {" "}
          &diams; Game Information &diams;
        </h2>
        <div className="mt-2 text-xs leading-6 indent-4 drop-shadow-md largeMobile:text-lg tablet:text-xl tablet:leading-8 largeScreen:leading-10 largeScreen:text-xl">
          <p className="">
            1. You don't lose anything if you fail in this mini game.
          </p>
          <p className="">
            2. You have 30-40 seconds to answer each question, depending on its
            length.
          </p>
          <p className="">3. When answering incorrectly, a ❤ is lost.</p>
          <p className="">4. If you lose all ❤s (top-left), the game ends.</p>
          <p className="">5. By choosing the correct answer, a ⭐ is earned.</p>
          <p className="">
            6. The Stars (⭐) on the top right represent the Rewards.
          </p>
          <p className="">
            7. You can also win the game, by collecting 3 Stars (⭐).
          </p>
          <p className="">
            8. Finally, depending on the collected Stars, you will be rewarded a
            Resource Refund.
          </p>
          <h2 className="font-Rocher text-emerald-400 text-center drop-shadow-lg underline underline-offset-2 mt-4 text-lg largeMobile:text-xl tablet:text-3xl largeScreen:text-5xl">
            {" "}
            The End
          </h2>
        </div>
      </div>
    </>
  );
};

export default QuizGameInfo;

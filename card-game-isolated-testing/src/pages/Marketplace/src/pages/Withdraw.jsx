import { useStateContext } from "../context";
import { DisplayCards } from "../components";

const Withdraw = () => {
  const {
    userId,
    userSoldCards,
    isLoadingSoldCards,
    hasCards4Sale,
    isErrorSoldCards,
  } = useStateContext();

  console.log("--Withdraws: ", userSoldCards);
  console.log("--Withdraws - UserId: ", isLoadingSoldCards);
  return (
    <>
      {userId && (
        <DisplayCards
          title="Your Sold Cards"
          isLoading={isLoadingSoldCards}
          isSuccess={hasCards4Sale}
          isErrorSoldCards={isErrorSoldCards}
          cards={userSoldCards}
          from="withdraw"
        />
      )}
    </>
  );
};

export default Withdraw;

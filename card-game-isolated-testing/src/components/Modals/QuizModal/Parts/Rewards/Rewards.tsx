interface RewardsProps {
  rewards: number;
}

const Rewards = ({ rewards }: RewardsProps) => {
  return <div>{`Rewards: [${rewards}]`}</div>;
};

export default Rewards;

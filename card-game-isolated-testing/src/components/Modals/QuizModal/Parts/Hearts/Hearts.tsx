interface HeartsProps {
  hearts: number;
}

const Hearts = ({ hearts }: HeartsProps) => {
  return <div>{`Hearts: [${hearts}]`}</div>;
};

export default Hearts;

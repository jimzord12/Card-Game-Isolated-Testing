const SizedBox = ({ width = 100, height = 24 }) => {
  const dimensionsStr = `w-[${width}px] h-[${height}px]`;

  return <div className={dimensionsStr} />;
};

export default SizedBox;

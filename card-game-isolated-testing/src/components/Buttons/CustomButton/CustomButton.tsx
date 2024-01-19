interface CustomButtonProps {
  title: string;
  handleClick: (e: React.MouseEvent) => void;
  restStyles?: string;
  isDisabled?: boolean;
}

function CustomButton({
  title,
  handleClick,
  restStyles,
  isDisabled = false,
}: CustomButtonProps) {
  const isDisabledStyles = isDisabled ? "bg-[#777a80] text-[#064006]" : "";
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg bg-[#309123] text-3xl text-white font-rajdhani font-bold ${restStyles} ${isDisabledStyles}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
}

export default CustomButton;

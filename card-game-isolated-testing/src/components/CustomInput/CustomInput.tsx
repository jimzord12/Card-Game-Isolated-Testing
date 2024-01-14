interface CustomInputProps {
  label: string;
  placeHolder: string;
  Attribs?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: string | null;
}

function CustomInput({ label, placeHolder, Attribs, value }: CustomInputProps) {
  return (
    <>
      <label
        htmlFor="name"
        className="font-rajdhani font-semibold text-2xl text-white mb-3 mt-2"
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={value ? value : placeHolder}
        // value={value}
        readOnly={value ? true : false}
        {...Attribs}
        className="bg-siteDimBlack text-white outline-none focus:outline-[#309123] p-4 rounded-md sm:max-w-[50%] max-w-full"
      />
    </>
  );
}

export default CustomInput;
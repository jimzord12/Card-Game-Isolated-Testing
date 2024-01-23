import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

export interface CustomInputProps {
  label: string;
  placeHolder?: string;
  /** You get those from the useInput hook
   */
  Attribs?: React.InputHTMLAttributes<HTMLInputElement>;
  /** If you pass this prop, the input will become read-only
   */
  value?: string | null;
  isDisabled?: boolean;
  copyToClipboard?: boolean;
}

/**
 * USE DARK BACKGROUND FOR THIS COMPONENT
 * It's more complex than it looks!
 * It should be used with the useInput hook, which in turn uses the useLocalStorage hook.
 * Additionally, if the value prop is passed, the input will become read-only.
 * By enabling the 'copyToClipboard', a copy icon will appear next to the input, which will copy the value to the clipboard when clicked.
 */
function CustomInput({
  label,
  placeHolder = "Type here...",
  Attribs,
  value,
  isDisabled = false,
  copyToClipboard = false,
}: CustomInputProps) {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      console.log("© Copied to clipboard: ", value);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000); // Reset message after 2 seconds
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <>
      <label
        htmlFor="name"
        className="font-rajdhani font-semibold text-2xl text-white mb-3 mt-2"
      >
        {label}
      </label>
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder={
            isDisabled ? "...Disabled..." : value ? value : placeHolder
          }
          // value={value}
          readOnly={isDisabled ? true : value ? true : false}
          {...Attribs}
          className="bg-siteDimBlack text-white outline-none focus:outline-[#309123] p-4 rounded-md w-full max-w-[560px]"
        />
        {copyToClipboard && value && !isDisabled && (
          <div className="ml-2 cursor-pointer hover:text-green-400">
            {copySuccess ? (
              <DoneIcon fontSize="large" />
            ) : (
              <ContentCopyIcon
                fontSize="large"
                onClick={() => handleCopyClick()}
              />
            )}
          </div>
        )}
      </div>
      {copySuccess && (
        <span className="text-sm text-green-500">{copySuccess}</span>
      )}
    </>
  );
}

export default CustomInput;

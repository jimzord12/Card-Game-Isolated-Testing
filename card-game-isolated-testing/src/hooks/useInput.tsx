import { useState } from "react";
// import useLocalStorage from "./useLocalStorage";

const regex = /^[A-Za-z0-9 ]+$/;

const useInput = (/*key: string,*/ initValue: string) => {
  const [value, setValue] = useState(initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "" || regex.test(e.target.value))
        // console.log("Player Name Input: ", e.target.value);
        setValue(e.target.value);
    },
  };

  return { value, reset, attributeObj };
};

export default useInput;

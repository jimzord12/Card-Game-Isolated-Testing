import useLocalStorage from "./useLocalStorage";

const regex = /^[A-Za-z0-9 ]+$/;

const useLocalPrivKey = (key: string, initValue: string) => {
  const [privKeyValue, setValue] = useLocalStorage(key, initValue);

  const resetPrivKeyField = () => setValue(initValue);

  const userAttribs = {
    privKeyValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "" || regex.test(e.target.value))
        setValue(e.target.value);
    },
  };

  return { privKeyValue, resetPrivKeyField, userAttribs };
};

export default useLocalPrivKey;

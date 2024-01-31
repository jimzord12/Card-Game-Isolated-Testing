import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import * as React from "react";

interface IOSSwitchBtnProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const IOSSwitchBtn = styled((props: IOSSwitchBtnProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface SwitchBtnProps {
  usingLW: boolean;
  setUsingLW: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SwitchBtn({ usingLW, setUsingLW }: SwitchBtnProps) {
  const [isActive, setIsActive] = React.useState<boolean>(usingLW);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    setUsingLW(event.target.checked);
    setIsActive(!usingLW);
    // console.log("From SwithBtn - Local Wallet: ", !usingLW);
  };

  return (
    <>
      <FormControlLabel
        control={<IOSSwitchBtn checked={usingLW} onChange={handleChange} />}
        label="Use Local Wallet"
        sx={{
          marginLeft: "2px",
          ".MuiFormControlLabel-label": {
            color: isActive ? "limegreen" : "white", // Change the color to red
            fontWeight: "semi-bold", // Make the text bold
            fontSize: "1rem", // Set the font size to 1rem
            paddingLeft: 1,
            // ... add any other styles you want to apply
          },
        }}
      />
    </>
  );
}

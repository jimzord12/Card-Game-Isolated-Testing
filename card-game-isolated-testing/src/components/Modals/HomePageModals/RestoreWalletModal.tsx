import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../Buttons/CustomButton/CustomButton";
import { useState } from "react";
import useInput from "../../../hooks/useInput";
import { isValidEthereumPrivateKey } from "../../../utils/blockchain/privKeyValidator";

type retrieveWalletReturnType = () =>
  | {
      walletAddress: string;
      success: boolean;
    }
  | {
      walletAddress: null;
      success: boolean;
    };

interface RestoreWalletModalProps {
  open: boolean;
  retrieveWallet: (walletAddress?: string) => retrieveWalletReturnType;
  title?: string;
  message?: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  bgcolor: "#065c1d",
  border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function RestoreWalletModal({
  open,
  title = "To restore your wallet, you need your private key:",
  retrieveWallet,
}: // message = "We will send you 0.5 ETH if your balance is insufficient.",
RestoreWalletModalProps) {
  const [privKeyValue, , userAttribs] = useInput("privKey", "");

  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="transaction-modal-title"
      aria-describedby="transaction-modal-description"
    >
      <Box sx={style}>
        <Typography id="transaction-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
            gap: 8,
          }}
        >
          <CustomInput
            label="Please insert your private key:"
            placeHolder="0x23dcf1..."
            Attribs={userAttribs}
            value={}
          />

          <CustomButton
            title="Restore"
            handleClick={() => retrieveWallet(privKeyValue)}
            isDisabled={isValidEthereumPrivateKey(privKeyValue) ? false : true}
          />
          {/* <Typography
            id="transaction-modal-description"
            sx={{ mt: 2 }}
            variant="body1"
          >
            {message}
          </Typography> */}
        </Box>
      </Box>
    </Modal>
  );
}

export default RestoreWalletModal;

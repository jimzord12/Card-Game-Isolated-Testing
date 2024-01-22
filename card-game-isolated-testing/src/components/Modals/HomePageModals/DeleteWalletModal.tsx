import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import CustomButton from "../../Buttons/CustomButton/CustomButton";
interface DeleteWalletModalProps {
  open: boolean;
  title?: string;
  message?: string;
  setModalVisibility: Dispatch<SetStateAction<boolean>>;
  deleteWallet: () => void;
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

function DeleteWalletModal({
  open,
  title = "IMPORTANT WARNING",
  message = "If you haven't stored your private key somewhere, there is no way of recovering this wallet.",
  deleteWallet,
  setModalVisibility,
}: DeleteWalletModalProps) {
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
          }}
        >
          <Typography
            id="transaction-modal-description"
            sx={{ mt: 2, fontSize: 22 }}
            variant="body1"
          >
            <>
              {message}
              <br />
              <br />
              {"Are you sure you want to delete your wallet?"}
            </>
          </Typography>
          <div className="flex mt-12 gap-6">
            <CustomButton
              title="Delete"
              handleClick={() => {
                deleteWallet();
                setModalVisibility(false);
              }}
              restStyles="bg-red-600 hover:bg-red-700"
            />
            <CustomButton
              title="Cancel"
              handleClick={() => {
                setModalVisibility(false);
              }}
              restStyles="bg-blue-600 hover:bg-blue-700"
            />
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteWalletModal;

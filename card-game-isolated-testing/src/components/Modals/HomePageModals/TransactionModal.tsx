import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

interface TransactionModalProps {
  open: boolean;
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

function TransactionModal({
  open,
  title = "Checking Your ETH Balance",
  message = "We will send you 0.5 ETH if your balance is insufficient.",
}: TransactionModalProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      console.log("🔷 - TransactionModal: useEffect: setTimeoutId");
      setIsOpen(false);
    }, 10 * 1000);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [open]);

  return (
    <Modal
      open={isOpen}
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
          <CircularProgress />
          <Typography
            id="transaction-modal-description"
            sx={{ mt: 2 }}
            variant="body1"
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default TransactionModal;

import Box from "@mui/material/Box/Box";
import Stepper from "@mui/material/Stepper/Stepper";
import Step from "@mui/material/Step/Step";
import StepLabel from "@mui/material/StepLabel/StepLabel";

const steps = [
  "Install MetaMask",
  "Connect it to the page",
  "Select the Genera Network",
];

export default function WalletStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  //   const [currentStep, setCurrentStep] = useState(0);
  return (
    <Box
      sx={{
        width: "100%",
        transform: "translateX(-30px)",
      }}
    >
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              Mui-completed
              sx={{
                "& .MuiStepLabel-label": {
                  //   color: '#309123',
                  color: "whitesmoke",
                },
                "& .MuiStepLabel-label.Mui-active": {
                  //   color: '#309123',
                  color: "whitesmoke",
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  //   color: '#309123',
                  color: "whitesmoke",
                },

                "& .MuiStepIcon-root": {
                  color: "#309123",
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#309123",
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "#309123",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

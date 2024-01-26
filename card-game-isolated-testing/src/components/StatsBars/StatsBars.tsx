import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { useState } from "react";
import { useUtilsForStatsBars } from "./useUtilsForStatsBars";
import Typography from "@mui/material/Typography/Typography";
import Paper from "@mui/material/Paper/Paper";
import { CSSObject } from "@mui/material";
import "./statsBars.css";

type TopBarStats = {
  gold: number;
  population: number;
  energy: number;
  rank: number;
};

type ButtomBarStats = {
  concrete: number;
  metals: number;
  crystals: number;
  diesel: number;
};

interface ResourceBarProps {
  statsToDisplay: TopBarStats;
  resourcesToDisplay: ButtomBarStats;
}

const StatsBar = ({ statsToDisplay, resourcesToDisplay }: ResourceBarProps) => {
  const [showOtherBar, setShowOtherBar] = useState(true);

  // This approach was chosen because it was the fastest way to migrate the old code here.
  const { iconFinder, getstylesEI, shortenLongNum /*visibilityA*/ } =
    useUtilsForStatsBars();

  const mediaQuery360 = useMediaQuery("(min-width:360px)");
  const mediaQuery480 = useMediaQuery("(min-width:480px)");
  const mediaQuery600 = useMediaQuery("(min-width:600px)");
  const mediaQuery760 = useMediaQuery("(min-width:760px)");
  const mediaQuery900 = useMediaQuery("(min-width:900px)");
  const mediaQuery1200 = useMediaQuery("(min-width:1200px)");

  return (
    <div className="flex z-10 fixed">
      {statsToDisplay && (
        <Box
          // sx={{ position: mediaQuery480 ? 'absolute' : 'static', left: '8px' }}
          sx={{
            position: "fixed",
            top: "0px",
            left: "6px",
            zIndex: 410,
            width: mediaQuery1200
              ? "650px"
              : mediaQuery900
              ? "55%"
              : mediaQuery760
              ? "60%"
              : mediaQuery600
              ? "75%"
              : mediaQuery480
              ? "80%"
              : mediaQuery360
              ? "100%"
              : "100%",
          }}
        >
          <Container
            onClick={() => setShowOtherBar(!showOtherBar)}
            disableGutters
          >
            {/* ----- STATS ----- */}
            {showOtherBar && (
              <Grid
                container
                spacing={2}
                // border={2}
                sx={{
                  // background: "#c21500",
                  // background:
                  //   "-webkit-linear-gradient(to right, #FC354C, #0ABFBC)",
                  background: "linear-gradient(to right, #FC354C, #0ABFBC)",
                  width: "95%",
                  height: "100%",
                  margin: "0px",
                  marginBottom: "6px",
                  marginTop: "6px",
                  borderRadius: "5px",
                  boxShadow: "4px 7px black",
                  // visibility: !showOtherBar ? 'visible' : 'hidden',
                  // visibility: visibilityA(showOtherBar, "stats"),
                }}
              >
                {Object.entries(statsToDisplay).map(([stat, value], index) => (
                  <Grid
                    key={stat + index}
                    xs={3}
                    sm={6}
                    sx={{
                      display: "flex",
                      padding: 1,
                    }}
                  >
                    <Paper
                      elevation={8}
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        padding: "2px 6px",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      {iconFinder(stat)}
                      <Typography
                        variant={
                          mediaQuery360
                            ? mediaQuery900
                              ? "h6"
                              : "body1"
                            : "body2"
                        }
                        sx={{ fontWeight: "600" }}
                      >
                        {shortenLongNum(value)}
                        {/* {desiredDigits(4, value)} */}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            {!showOtherBar && (
              <Grid
                container
                spacing={2}
                // xs={3}
                // sm={6}
                sx={{
                  // background: "#c21500",
                  // background:
                  //   "-webkit-linear-gradient(to right, #71B280, #F3A183)",
                  background: "linear-gradient(to right, #71B280, #F3A183)",
                  width: "95%",
                  height: "100%",
                  margin: "0px",
                  marginBottom: "6px",
                  marginTop: "6px",
                  borderRadius: "5px",
                  boxShadow: "4px 7px black",
                }}
              >
                {/* ----- RESOURCES ----- */}
                {Object.entries(resourcesToDisplay).map(
                  ([resource, value], index) => (
                    <Grid
                      key={resource + index}
                      xs={3}
                      sm={6}
                      sx={{
                        display: "flex",
                        padding: 1,
                      }}
                    >
                      <Paper
                        elevation={8}
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          padding: "2px 6px",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            transform:
                              resource === "diesel" && mediaQuery600
                                ? "translateX(-8px)"
                                : "",
                          }}
                        >
                          {iconFinder(resource)}
                        </span>
                        <Typography
                          variant={
                            mediaQuery360
                              ? mediaQuery900
                                ? "h6"
                                : "body1"
                              : "body2"
                          }
                          sx={{ fontWeight: "600" }}
                        >
                          {/* {desiredDigits(4, value)} */}
                          {shortenLongNum(value)}
                        </Typography>
                      </Paper>
                    </Grid>
                  )
                )}
              </Grid>
            )}
          </Container>
        </Box>
      )}
      <Box sx={getstylesEI() as CSSObject}>
        {/* //TODO: ‼ Add effect indicator */}
        {/* {isEffectActive && (
          <EffectIndicator
            // duration={durationLeft}
            // duration={effectDuration}
            image={workaholismImg}
            isEffectActive={isEffectActive}
            tooltipText={"test!!!"}
            effectRef={specialEffectsRef}
          />
        )} */}
      </Box>
    </div>
  );
};

export default StatsBar;

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// React-Icons
import {
  GiAutoRepair,
  GiCardPick,
  GiBuyCard,
  GiTrophyCup,
  GiWireframeGlobe,
} from "react-icons/gi";

import useGetLabelsSize from "../../hooks/game/useGetLabelsSize";
import { useNavigate } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";
interface GameSideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openInventoryModal: () => void;
  openCardCraftingModal: () => void;
  changeMap: () => void;
}

export default function GameSideBar({
  isOpen,
  setIsOpen,
  changeMap,
  openCardCraftingModal,
  openInventoryModal,
}: GameSideBarProps) {
  const deviceSize = useGetLabelsSize();
  const navigate = useNavigate();

  const iconSize = deviceSize === "extraSmall" ? 36 : 42;
  const selectedAnchor = "right";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "green",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inventory", "Card Crafting"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() =>
              index === 0 ? openInventoryModal() : openCardCraftingModal()
            }
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <GiCardPick size={iconSize} color="white" />
                ) : (
                  <GiAutoRepair size={iconSize} color="white" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {["Marketplace", "Leaderboard"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={
              index === 0
                ? () => navigate("/marketplace/")
                : () => navigate("/leaderboard/")
            }
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <GiBuyCard size={iconSize} color="white" />
                ) : (
                  <GiTrophyCup size={iconSize} color="white" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {["Change Map"].map((text) => (
          <ListItem key={text} disablePadding onClick={() => changeMap()}>
            <ListItemButton>
              <ListItemIcon>
                <GiWireframeGlobe size={iconSize} color="white" />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"Game-Sidebar"}>
        {/* <Button onClick={toggleDrawer("right", true)}>{"Actions"}</Button> */}
        <Drawer
          anchor={selectedAnchor}
          open={isOpen}
          onClose={
            () => setIsOpen(false)
            // toggleDrawer(selectedAnchor, false)
          }
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "green",
              height: "fit-content",
              // width: "fit-content",
              // minWidth: "350px",
              // minHeight: "350px",

              // borderRadius: "0px 10px 10px 0",
              borderRadius: "10px 0px 0px 10px",

              position: "absolute",
              // left: "calc(80% - 175px)",
              // bottom: "0px",
              // top: "auto",
              // left: "0px",
              // right: "100px",
            }, // This line changes the background color to green
          }}
        >
          {list(selectedAnchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

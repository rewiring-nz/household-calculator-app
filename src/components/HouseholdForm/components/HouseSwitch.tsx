import { styled } from "@mui/system";
import { Switch } from "@mui/material";
import { Theme } from "@mui/material";


export const HouseSwitch = styled(Switch)(({ theme }: { theme: Theme }) => ({
  width: 40,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#000", // theme.palette.primary.dark,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.background.paper,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.text.primary,
      border: "6px solid #CCCCCC",
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
    width: 16, // 22,
    height: 16, // 22,
    margin: 2,
    boxShadow: "none",
    backgroundColor: theme.palette.common.white, // Set the thumb color when unchecked
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.action.disabledBackground, // '#CCCCCC', // theme.palette.background.paper,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

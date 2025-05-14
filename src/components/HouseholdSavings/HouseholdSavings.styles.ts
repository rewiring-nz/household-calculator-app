import { Box, Button, Theme } from "@mui/material";
import { styled } from "@mui/system";
import RecommendationImage from "./data/RecommendationImage";

export const SavingsFrameBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: "1rem 1.6rem",
}));

export const StyledRecommendationImage = styled(RecommendationImage)(
  ({ theme }) => ({
    width: "100%",
    height: "auto",
    maxWidth: "8.125rem",
  }),
);

export const NextStepButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  textTransform: "initial",
  fontSize: theme.typography.body1.fontSize,
  lineHeight: "1.1rem",
  borderRadius: "8px",
  boxShadow: "none",
  // color: theme.palette.info.contrastText,
  width: "100%",
  padding: "1rem 0.7rem",
  boxSizing: "border-box",
  "&:hover": {
    boxShadow: "none",
  },
  "&#next-step-button-action.main-action": {
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  },
  "&#next-step-button-all-guides.secondary-action": {
    backgroundColor: theme.palette.info.light,
    "&:hover": {
      backgroundColor: "#E1D2FA",
    },
  },
  // "&#next-step-button-all-guides.main-action": {
    // backgroundColor: theme.palette.info.light,
    // "&:hover": {
      // backgroundColor: theme.palette.info.dark,
    // },
  // },
}));

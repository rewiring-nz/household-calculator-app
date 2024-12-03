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
  margin: ".7rem 0",
  borderRadius: "0.25rem",
  boxShadow: "none",
  color: theme.palette.info.contrastText,
  // width: "100%",
  padding: "0.7rem",
  boxSizing: "border-box",
  "&#next-step-button-action": {
    "&:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.info.dark,
    },
  },
  "&#next-step-button-all-guides": {
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.background.default,
    },
  },
}));

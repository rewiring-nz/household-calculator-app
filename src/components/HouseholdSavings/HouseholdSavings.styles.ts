import { Box, Link, LinkProps } from "@mui/material";
import { styled } from "@mui/system";
import RecommendationImage from "./data/RecommendationImage";


export const HouseLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: "#2D62FF",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

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

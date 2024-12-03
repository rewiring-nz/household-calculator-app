import React, { useEffect } from "react";
import { Box, IconButton, styled, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow-back.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/x-window1.svg";

const MethodParagraph = styled(Typography)(() => ({
  maxWidth: "40rem",
}));

const Methodology: React.FC = () => {
  const theme = useTheme();

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 1.5rem 0.6rem 1.7rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            component={RouterLink}
            to="/"
            aria-label="back"
          >
            <ArrowBackIcon
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", marginLeft: "8px" }}
          >
            Back
          </Typography>
        </div>
        <IconButton
          edge="end"
          color="inherit"
          component={RouterLink}
          to="/"
          aria-label="close"
        >
          <CloseIcon
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        </IconButton>
      </div>

      <Box
        className="content"
        sx={{
          maxWidth: "30rem",
          padding: "1rem",
          [theme.breakpoints.up("sm")]: {
            maxWidth: "35rem",
            margin: "2.5rem auto",
          },
          [theme.breakpoints.up("md")]: {
            maxWidth: "80rem",
            margin: "2.5rem 7rem",
          },
        }}
      >
        <Typography variant="h1">How we calculated this result</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: "1.5rem" }}>
          Our calculator helps you understand the potential financial and environmental benefits of electrifying your home.
        </Typography>

        <Typography
          variant="h2"
          sx={{
            margin: "3.1rem 0 0.9rem 0",
          }}
        >
          Our Approach
        </Typography>
        <Box
          className="paragraphs"
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            [theme.breakpoints.up("md")]: {
              flexDirection: "row",
              gap: "2rem",
            },
          }}
        >
          <Box>
            <MethodParagraph variant="subtitle2">
              We've developed a comprehensive model that looks at your entire household energy use, including heating, water heating, cooking, and transportation. Our calculations are based on real-world data from New Zealand government sources, energy pricing, and household energy consumption studies.
            </MethodParagraph>

            <Typography variant="h3" sx={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              What We Look At
            </Typography>
            <MethodParagraph variant="subtitle2">
              Our calculator considers:
              <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                <li>Energy use for space heating</li>
                <li>Water heating systems</li>
                <li>Cooking appliances</li>
                <li>Vehicle energy consumption</li>
                <li>Potential solar and battery installations</li>
              </ul>
            </MethodParagraph>

            <Typography variant="h3" sx={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              How We Calculate Savings
            </Typography>
            <MethodParagraph variant="subtitle2">
              We compare your current energy setup with an electrified version of your home. This means:
              <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                <li>Replacing gas or wood heaters with efficient heat pumps</li>
                <li>Switching to electric water heaters and induction cooktops</li>
                <li>Calculating potential electric vehicle savings</li>
              </ul>
            </MethodParagraph>
          </Box>

          <Box>
            <Typography variant="h3" sx={{ marginBottom: "0.5rem" }}>
              Key Factors We Consider
            </Typography>
            <MethodParagraph variant="subtitle2">
              Our model takes into account:
              <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                <li>Your specific region's energy needs</li>
                <li>Number of household occupants</li>
                <li>Current and projected energy prices</li>
                <li>Emissions factors for different energy types</li>
                <li>Installation and replacement costs of appliances</li>
              </ul>
            </MethodParagraph>

            <Typography variant="h3" sx={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              Data Sources
            </Typography>
            <MethodParagraph variant="subtitle2">
              We use data from reputable sources including:
              <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                <li>Ministry for the Environment</li>
                <li>EECA Energy End Use Database</li>
                <li>Australian and New Zealand Residential Baseline Study</li>
                <li>Official New Zealand government statistics</li>
              </ul>
            </MethodParagraph>

            <MethodParagraph variant="subtitle2" sx={{ marginTop: "1.5rem", fontStyle: "italic" }}>
              Note: Actual savings may vary based on individual household characteristics, energy use patterns, and future energy price changes.
            </MethodParagraph>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Methodology;

import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Link,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow-back.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/x-window1.svg";

const MethodParagraph = styled(Typography)(() => ({
  maxWidth: "40rem",
  marginBottom: "1.5rem",
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
          Our calculator helps you understand the potential financial and
          environmental benefits of electrifying your home.
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
            <Typography variant="h2">Our Approach</Typography>
            <MethodParagraph>
              We've developed a model that looks at your entire household energy
              use, including heating, water heating, cooking, other electronics,
              and transportation. Our calculations are based on real-world data
              from New Zealand government sources, energy pricing, and household
              energy consumption studies.
            </MethodParagraph>

            <MethodParagraph sx={{ marginTop: "1.5rem", fontStyle: "italic" }}>
              Note: Actual savings may vary based on individual household
              characteristics, energy use patterns, and future energy price
              changes.
            </MethodParagraph>

            <Typography variant="h2">How We Calculate Savings</Typography>
            <MethodParagraph>
              We compare your current energy setup with fully electrified
              version of your home. This means:
              <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                <li>
                  Replacing fossil fuel heaters (gas or LPG), wood, or electric
                  resistive heaters (like oil columns or fan heaters) with
                  efficient heat pumps for maximum heating savings
                </li>
                <li>
                  Switching to electric water heaters and induction cooktops
                </li>
                <li>Installing solar and/or batteries, if you would like</li>
                <li>
                  Switching from fossil fuel vehicles to EVs, if you would like
                </li>
              </ul>
            </MethodParagraph>

            <Typography variant="h3">Energy Consumption</Typography>
            <MethodParagraph>
              We derive average household energy use across different appliances
              through the{" "}
              <Link
                href="https://www.energyrating.gov.au/industry-information/publications/report-2021-residential-baseline-studyaustralia-and-new-zealand-2000-2040"
                target="_blank"
              >
                Australian and New Zealand Residential Baseline Study 2021
              </Link>{" "}
              (published November 2022). For house heating, energy use varies by
              fuel type, with wood and gas heaters using the most energy, and
              heat pumps being the most efficient. Water and cooktop energy use
              is also derived from standard efficiency values for gas, electric,
              and heat pump systems. For household appliances like lighting,
              laundry, and cooling, a static average daily consumption is used.
              These energy use values are scaled by regional differences in
              heating demand (e.g. Otago requires more house heating than
              Northland).
            </MethodParagraph>
            <MethodParagraph>
              Energy use is then scaled by household occupancy, using an
              exponential model to account for nonlinear, diminishing increases
              in energy consumption as household size increases.
            </MethodParagraph>
            <MethodParagraph>
              Average vehicle energy use is calculated from the{" "}
              <Link
                href="https://www.eeca.govt.nz/insights/data-tools/energy-end-use-database/"
                target="_blank"
              >
                EECA Energy End Use Database
              </Link>
              , using 2019 data to avoid COVID anomalies. We assume the average
              NZ driver drives 210 km per week (
              <Link
                href="https://www.transport.govt.nz/statistics-and-insights/fleet-statistics/annual-fleet-statistics/"
                target="_blank"
              >
                Ministry of Transport's Annual Fleet Statistics, 2019
              </Link>
              ), then scale this based on each vehicle's stated usage
              (kilometres driven per year).
            </MethodParagraph>
            <MethodParagraph>
              Solar energy generation is modeled based on panel size, location,
              and degradation over 30 years (averaging 93.08% of nameplate
              capacity performance), with regional variations in solar capacity.
              Battery capacity is determined by size, degradation (averaging
              85.22% of nameplate capacity over 15 year lieftime), and
              round-trip efficiency (95%)
            </MethodParagraph>
          </Box>

          <Box>
            <Typography variant="h3">Emissions Reduction</Typography>
            <MethodParagraph>
              To calculate emissions, we take the energy calculations from each
              machine and multiply these by their emissions factors. We use
              these emissions factors are taken from the Ministry for the
              Environment's{" "}
              <Link
                href="https://environment.govt.nz/assets/publications/Measuring-Emissions-Guidance_EmissionFactors_Summary_2023_ME1781.pdf"
                target="_blank"
              >
                Measuring emissions: A guide for organisations (2023)
              </Link>
              .{" "}
            </MethodParagraph>
            <MethodParagraph>
              To calculate emissions savings, we simply take the difference
              between the current and electrified household's total emissions.
              The emissions reductions are a conservative estimate, because the
              calculation does not yet separate the electricity used from solar
              panels (which has zero emissions) from the electricity taken from
              the grid (which still has a small, albeit decreasing, carbon
              footprint as our national grid becomes more renewable).
            </MethodParagraph>

            <Typography variant="h3">Operating Costs (Energy Bill)</Typography>
            <MethodParagraph>Lorem ipsum</MethodParagraph>

            <Typography variant="h3">Solar & Battery Considerations</Typography>
            <MethodParagraph>Lorem ipsum</MethodParagraph>
            <Typography variant="h2">Further reading</Typography>
            <MethodParagraph>
              <ul>
                <li>
                  <Link
                    href="https://github.com/rewiring-nz/household-model/blob/main/METHODOLOGY.md"
                    target="_blank"
                  >
                    Read our detailed methodology on GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/rewiring-nz/household-model"
                    target="_blank"
                  >
                    See our open-source model on GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/rewiring-nz/household-calculator-app"
                    target="_blank"
                  >
                    See our open-source app on GitHub
                  </Link>
                </li>
              </ul>
            </MethodParagraph>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Methodology;

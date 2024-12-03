import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow-back.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/x-window1.svg";
import "./Methodology.css";

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
        id="methodology-content"
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
            <Typography variant="body2">
              We've developed a model that looks at your entire household energy
              use, including heating, water heating, cooking, other electronics,
              and transportation. Our calculations are based on real-world data
              from New Zealand government sources, energy pricing, and household
              energy consumption studies.
            </Typography>

            <Typography variant="body2" sx={{fontStyle: "italic" }}>
              Note: Actual savings may vary based on individual household
              characteristics, energy use patterns, and future energy price
              changes.
            </Typography>

            <Typography variant="h2">Cost & Emissions Savings</Typography>
            <Typography variant="body2">
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
            </Typography>

            <Typography variant="h3">Energy Consumption</Typography>
            <Typography variant="body2">
              We derive average household energy use across different appliances
              through the{" "}
              <Link
                href="https://www.energyrating.gov.au/industry-information/publications/report-2021-residential-baseline-study-australia-and-new-zealand-2000-2040"
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
              Northland). They are also scaled by household occupancy, using an
              exponential model to account for nonlinear, diminishing increases
              in energy consumption as household size increases.
            </Typography>
            <Typography variant="body2">
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
            </Typography>
            <Typography variant="body2">
              Solar energy generation is modeled based on panel size, location,
              and degradation over 30 years (averaging 93.08% of nameplate
              capacity performance), with regional variations in solar capacity.
              Battery capacity is determined by size, degradation (averaging
              85.22% of nameplate capacity over 15 year lieftime), and
              round-trip efficiency (95%).
            </Typography>

            <Typography variant="h3">Emissions Reduction</Typography>
            <Typography variant="body2">
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
            </Typography>
            <Typography variant="body2">
              To calculate emissions savings, we simply take the difference
              between the current and electrified household's total emissions.
              The emissions reductions are a conservative estimate, because the
              calculation does not yet separate the electricity used from solar
              panels (which has zero emissions) from the electricity taken from
              the grid (which still has a small, albeit decreasing, carbon
              footprint as our national grid becomes more renewable).
            </Typography>

            <Typography variant="h3">
              Operating Costs (Energy & Fuel Bill)
            </Typography>
            <Typography variant="body2">
              To calculate how much you would save on your energy and fuel
              bills, we first determine much of the electricity needs are met by
              solar, battery storage, or the grid, and how much solar-generated
              power is left for export. We assume that half of a household's
              appliance and vehicle electricity needs can be met by generated
              solar (50% self-consumption). This is a conservative estimate of
              how much energy consumption can be shifted to daylight hours.
            </Typography>
            <Typography variant="body2">
              Next, we calculate energy costs for each fuel type, including
              electricity. We price the electricity consumed from the grid at a
              weighted proportion between regular volume costs and off-peak
              costs based on the battery's ability to shift grid consumption to
              off-peak hours. For other energy & fuel types like gas, petrol,
              and diesel, we simply multiply the energy consumption with the
              price per kWh. Weekly and yearly savings use 2024 prices, while
              savings over 15 years consider future price inflation.
            </Typography>
            <Typography variant="body2">
              Fixed costs (like gas, LPG, or grid connections) and Road User
              Charges are added, and solar export revenue is subtracted to get
              total operating costs. The difference between current and
              electrified household's operating costs gives the savings. Vehicle
              maintenance/servicing costs are not yet included, although they
              tend to be lower for EVs.
            </Typography>
          </Box>

          <Box>

            <Typography variant="h2">Upgrade Costs</Typography>
            <Typography variant="body2">
              Upgrade costs are the cost to replace your machines with electric alternatives - whether you upgrade them early, or as they reach their end of life.

              These are averages based on over 100 quotes,
              comparing mid-range options for typical appliances. Prices include
              both capital and installation costs, sourced from both online and
              direct quotes from installers. Due to variations in installation
              costs per region and installer, we recognise that a more detailed
              analysis of household conditions and installation costs per
              appliance and region would be valuable for planning household
              upgrades.
            </Typography>
            <Typography variant="body2">
              For vehicles, we provide a general range for replacing fossil fuel
              vehicles with EVs, based on New Zealand prices for popular
              vehicles. This estimate excludes the Clean Car Rebate, which ended
              in 2024.
            </Typography>
            <Typography variant="body2">
              The upfront cost of solar installation is estimated at
              $2277.78/kW, based on 2023 data from the Sustainable Energy
              Association of New Zealand and installer surveys. Inverter
              upgrade costs are assumed at $2,500. Battery costs are
              estimated at $1000/kWh based on similar sources.
            </Typography>
            <Typography variant="h2">Recommendations (Next Steps)</Typography>
            <Typography variant="body2">
              The calculator's recommendation for your next steps currently
              takes the first item off a prioritised list that your current
              household does not yet have. The list has been prioritised based
              on Rewiring's prior knowledge and research of what upgrades
              typically bring the most savings for a reasonable upfront cost:
              <ol>
                <li>Rooftop solar</li>
                <li>First EV</li>
                <li>Space heater</li>
                <li>Water heater</li>
                <li>Cooktop</li>
                <li>Battery</li>
                <li>All other EVs (high savings but expensive upfront cost)</li>
              </ol>
              In future, we may improve this recommendation algorithm to take
              into account machine-specific savings and upgrade costs.
            </Typography>
            <Typography variant="h2">Further reading</Typography>
            <Typography variant="body2">
              <ul>
                <li><Link href="https://www.rewiring.nz/electrification-guides/get-started" target="_blank">Explore our electrification guides</Link> for guidance on how to upgrade your household appliances and vehicles</li>
                <li>
                  <Link
                    href="https://github.com/rewiring-nz/household-model/blob/main/METHODOLOGY.md"
                    target="_blank"
                  >
                    Read our detailed methodology
                  </Link>{" "}
                  including energy consumption values, prices, and emissions
                  factors
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
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Methodology;

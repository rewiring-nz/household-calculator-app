import React, { useEffect } from "react";
import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
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
              Our model looks at your specific household's entire energy use,
              including heating, water heating, cooking, other electronics,
              transportation, and the options of solar and batteries, to
              calculate your personal savings estimates. Our calculations are
              based on real-world data from New Zealand government sources,
              energy pricing, and household energy consumption studies.
            </Typography>

            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
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
                  Replacing fossil fuel heaters (gas, LPG, diesel), wood, or
                  electric resistive heaters (like oil columns or fan heaters)
                  with efficient heat pumps for maximum heating savings
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
              fuel type, with wood, diesel, and gas/LPG heaters using the most
              energy, and heat pumps being the most efficient. Water and cooktop
              energy use is also derived from standard efficiency values for
              gas, electric, and heat pump systems. For household appliances
              like lighting, laundry, and cooling, a static average daily
              consumption is used. These energy use values are scaled by
              regional differences in heating demand (e.g. Otago requires more
              house heating than Northland). They are also scaled by household
              occupancy, using an exponential model to account for nonlinear,
              diminishing increases in energy consumption as household size
              increases.
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
              machine and multiply these by their emissions factors. The
              emissions factors are taken from the Ministry for the
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
              Charges are added. Vehicle maintenance/servicing costs are not yet
              included, although they tend to be lower for EVs. Solar export
              revenue is then subtracted from the bills to get total operating
              costs. Learn more about Rewiring's advocacy on fair solar export
              prices from{" "}
              <Link
                href="https://www.rewiring.nz/symmetrical-export-tariffs"
                target="_blank"
              >
                our paper on symmetrical export tariffs
              </Link>
              .
            </Typography>
            <Typography variant="body2">
              The difference between current and electrified household's
              operating costs gives the savings.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2">Upgrade Costs</Typography>
            <Typography variant="body2">
              Upgrade costs are the cost to replace your machines with electric
              alternatives - whether you upgrade them early, or as they reach
              their end of life. These are averages based on over 100 quotes,
              comparing mid-range options for typical appliances. Prices include
              both capital and installation costs, sourced from both online and
              direct quotes from installers. Due to variations in installation
              costs per region and installer, we recognise that a more detailed
              analysis of household conditions and installation costs per
              appliance and region would be valuable for planning household
              upgrades - we plan to include this analysis in future. In the
              meantime, you can check out our{" "}
              <Link
                href="https://www.rewiring.nz/electrification-guides/get-started"
                target="_blank"
              >
                electrification guides
              </Link>{" "}
              for more information on how to electrify.
            </Typography>
            <Typography variant="body2">
              For vehicles, we provide a general range for replacing fossil fuel
              vehicles with new EVs, based on New Zealand prices for popular
              vehicles. This estimate excludes the Clean Car Rebate, which ended
              in 2024. It should be noted that buying an EV is a car purchase
              like any other. You don’t have to buy new; there are plenty of
              secondhand EVs available in the market now. Also, when buying a
              new car, you would usually take into account the purchase price
              (what we’ve shown) minus the resale value. So you wouldn’t
              normally be losing $30k-$70k outright for every EV you buy.
            </Typography>
            <Typography variant="body2">
              The upfront cost of solar installation is estimated at
              $2277.78/kW, based on 2023 data from the Sustainable Energy
              Association of New Zealand and installer surveys. Inverter upgrade
              costs are assumed at $2,500. Battery costs are estimated at
              $1000/kWh based on similar sources. Again, installation costs will
              vary by region and installer. Our{" "}
              <Link
                href="https://www.rewiring.nz/electrification-guides/solar"
                target="_blank"
              >
                rooftop solar
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.rewiring.nz/electrification-guides/home-batteries"
                target="_blank"
              >
                home battery
              </Link>{" "}
              electrification guides have more information to help.
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
            <Typography variant="h3">More information & analysis</Typography>
            <Typography variant="body2">
              🔧&nbsp;
              <Link
                href="https://www.rewiring.nz/electrification-guides/get-started"
                target="_blank"
              >
                Use our electrification guides
              </Link>{" "}
              to get started on upgrading your household appliances and vehicles
            </Typography>
            <Typography variant="body2">
              🔎&nbsp;
              <Link href="https://www.rewiring.nz/explained" target="_blank">
                Explore our FAQs
              </Link>{" "}
              on everything from finance to solar to waste
            </Typography>
            <Typography variant="body2">
              🧑🏽‍🏫&nbsp;
              <Link
                href="https://www.rewiring.nz/explained#watt"
                target="_blank"
              >
                Read our deep dive explainers
              </Link>{" "}
              on the big questions around efficiency, circular economy, energy
              use, and more
            </Typography>
            <Typography variant="body2">
              📑{" "}
              <Link
                href="https://www.rewiring.nz/electric-homes-report"
                target="_blank"
              >
                Read our Electric Homes report
              </Link>{" "}
              or our recent paper on the{" "}
              <Link href="https://www.rewiring.nz/tomorrow" target="_blank">
                macroeconomics of rooftop solar & batteries
              </Link>
            </Typography>
            <Typography variant="h3">About this calculator</Typography>
            <Typography variant="body2">
              🤓&nbsp;
              <Link
                href="https://github.com/rewiring-nz/household-model/blob/main/METHODOLOGY.md"
                target="_blank"
              >
                Dive into our detailed methodology
              </Link>{" "}
              including energy consumption values, prices, and emissions factors
            </Typography>
            <Typography variant="body2">
              👩🏻‍💻&nbsp;See our open-source&nbsp;
              <Link
                href="https://github.com/rewiring-nz/household-model"
                target="_blank"
              >
                Python model
              </Link>
              &nbsp;and&nbsp;
              <Link
                href="https://github.com/rewiring-nz/household-calculator-app"
                target="_blank"
              >
                React app
              </Link>
              &nbsp;on GitHub
            </Typography>

            <Typography variant="body2">
              This tool was created by{" "}
              <Link href="https://www.rewiring.nz/" target="_blank">
                Rewiring Aotearoa
              </Link>
              , a nonprofit representing everyday New Zealanders in the energy
              transition. Whakahiko te ao! (Electrify everything!) ⚡️
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Methodology;

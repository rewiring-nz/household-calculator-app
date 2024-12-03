import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MailchimpForm from "../MailChimpForm/MailChimpForm";

// ----------------- Styles & Material UI -------------------
import {
  Box,
  Button,
  Typography,
  useTheme,
  Link,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { FDivider } from "src/shared/styles/FDivider";

// ----------------- Components -------------------
import ResultBox from "./ResultBox";

import { ReactComponent as OpenIcon } from "src/assets/icons/open-outline.svg";

// ----------------- Models & Interfaces -------------------
import { Savings, UpfrontCost } from "../../shared/api/openapi-client";
import { electricVehicleURL } from "src/shared/links";
import { recommendationActions } from "./data/RecommendationActions";

import {
  calcPercentage,
  formatKgs,
  formatSavingsNZD,
  roundToSigFigs,
} from "src/shared/utils/formatters";
import { SavingsFrameBox } from "./HouseholdSavings.styles";

export interface SavingsProps {
  results: Savings;
  loadingData: boolean;
  numEVsToBuy: number;
  appliances: {
    currentSpaceHeater: string;
    currentWaterHeater: string;
    currentCooktop: string;
  };
  isMobile?: boolean;
}

const getVehicleCostStr = (numEVsToBuy: number): string => {
  const priceRangeLow = 30000;
  const priceRangeHigh = 70000;
  const totalPriceKsRangeLow = ((priceRangeLow * numEVsToBuy) / 1000).toFixed(
    0,
  );
  const totalPriceKsRangeHigh = ((priceRangeHigh * numEVsToBuy) / 1000).toFixed(
    0,
  );
  const vehicleCostStr = `$${totalPriceKsRangeLow}k-$${totalPriceKsRangeHigh}k`;
  return vehicleCostStr;
};

const getReplacementCostSubtext = (upfrontCost?: UpfrontCost) => {
  if (!upfrontCost?.battery) {
    if (!upfrontCost?.solar) {
      return "for new appliances";
    }
    return "for new appliances & solar";
  }
  if (!upfrontCost?.solar) {
    return "for new appliances & battery";
  }
  return "for new appliances, solar, and battery";
};

const HouseholdSavings: React.FC<SavingsProps> = ({
  results,
  loadingData,
  appliances,
  numEVsToBuy,
  isMobile = false,
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [upfrontCostTotal, setUpfrontCostTotal] = useState("0");
  const vehicleCostStr = getVehicleCostStr(numEVsToBuy);
  const replacementCostSubtext = getReplacementCostSubtext(
    results?.upfrontCost,
  );

  useEffect(() => {
    // Round constituent values to nearest $100 first before summing for total
    const total = results?.upfrontCost
      ? Object.values(results.upfrontCost)
          .map((value) => Math.round(value / 100) * 100) // Round each value to the nearest $100
          .reduce((acc, val) => acc + val, 0) // Sum the rounded values
      : 0;
    const totalString = `$${total.toLocaleString("en-NZ")}`;
    setUpfrontCostTotal(totalString);
  }, [results, loadingData]);

  // --------------------  Next Steps --------------------
  const recommendationKey = results?.recommendation?.action;
  const recommendationURL = results?.recommendation?.url || "";
  const { getDescription, buttonText, imageComponent } = recommendationKey
    ? recommendationActions[recommendationKey]
    : { getDescription: () => "", buttonText: "", imageComponent: "" };
  const description = getDescription(appliances);

  return (
    <Box
      className="HouseholdSavings"
      sx={{
        padding: "1.25rem",
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
        borderRadius: 0,
        margin: "auto 0",
        position: "sticky",
        top: "2rem",
        [theme.breakpoints.up("sm")]: {
          borderRadius: 1,
        },
        [theme.breakpoints.up("lg")]: {
          top: "3.5rem",
        },
      }}
      aria-label="Household Savings Section"
    >
      <Box
        className="ResultsHeader"
        sx={{
          margin: "0 0.1rem",
        }}
      >
        {!isMobile && (
          <Typography variant="h1" aria-label="Your Savings">
            Your Savings
          </Typography>
        )}
        <Typography variant="subtitle2">
          By electrifying your household, we estimate you could save:
        </Typography>
      </Box>

      <SavingsFrameBox
        className="Results"
        aria-label="Results"
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <ResultBox
          label="Energy Bills"
          heading={`${formatSavingsNZD(results?.opex?.perWeek?.difference, 0)} saved per week`}
        >
          <Typography variant="body1">
            <span style={{ fontWeight: "600" }}>
              {` ${formatSavingsNZD(results?.opex?.perYear?.difference, 0)}`}
            </span>{" "}
            saved per year
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "600" }}>
              {` ${formatSavingsNZD(results?.opex?.overLifetime?.difference, 0)}`}
            </span>{" "}
            saved over 15 year product lifetime
          </Typography>
        </ResultBox>

        <FDivider />

        <ResultBox
          label="Energy Emissions"
          heading={`${calcPercentage(results?.emissions?.perYear)}% saved`}
        >
          <Typography variant="body1">
            That's{" "}
            <span style={{ fontWeight: "600" }}>
              {formatKgs(results?.emissions?.perYear?.difference)}
            </span>
            of CO2e a year!
          </Typography>
        </ResultBox>

        <FDivider />

        <ResultBox
          label="Replacement Cost"
          heading={upfrontCostTotal}
          subheading={replacementCostSubtext}
          bulletPoints={[
            {
              label: "House heating",
              value: roundToSigFigs(results?.upfrontCost?.spaceHeating),
            },
            {
              label: "Water heating",
              value: roundToSigFigs(results?.upfrontCost?.waterHeating),
            },
            {
              label: "Cooktop",
              value: roundToSigFigs(results?.upfrontCost?.cooktop),
            },
            {
              label: "Solar",
              value: roundToSigFigs(results?.upfrontCost?.solar),
            },
            {
              label: "Battery",
              value: roundToSigFigs(results?.upfrontCost?.battery),
            },
          ]}
        >
          <p>
            Note that this is the <i>total</i> cost of new electric
            alternatives. When comparing with savings, you should compare the
            cost <i>difference</i> between new fossil fuel and electric
            alternatives.
          </p>
          {numEVsToBuy > 0 && (
            <>
              <Typography
                variant="h2"
                sx={{
                  margin: "1.5rem 0 0.2rem 0",
                }}
              >
                + {vehicleCostStr}
              </Typography>
              <Typography variant="body2">
                <span style={{ fontWeight: "600" }}>
                  for {numEVsToBuy} new EVs.
                </span>{" "}
                New mid-range EVs cost $30k-$70k each, depending on the model.
                Secondhand EVs start at ~$3k.&nbsp;
                <Link
                  href={electricVehicleURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Learn more here
                  <OpenIcon
                    style={{
                      marginLeft: "0.3rem",
                      maxWidth: "15px",
                      maxHeight: "15px",
                      stroke: "currentColor",
                    }}
                  />
                </Link>
              </Typography>
            </>
          )}
        </ResultBox>
        <FDivider />
        <Box sx={{ marginTop: "1.2rem", marginBottom: "1.2rem" }}>
          <Typography variant="body1">
            <Link component={RouterLink} to="/methodology">
              How did we calculate this?
            </Link>
          </Typography>
        </Box>
      </SavingsFrameBox>

      <SavingsFrameBox
        className="NextSteps"
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <Grid
          container
          sx={{
            margin: "0.4rem 0",
            padding: "0",
            boxSizing: "border-box",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: "0",
              boxSizing: "border-box",
              paddingRight: "0",
              [theme.breakpoints.up("md")]: {
                paddingRight: "1rem",
              },
            }}
          >
            <Box
              className="TopBox"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "0",
                boxSizing: "border-box",
              }}
            >
              <Box
                className="TextBox"
                sx={{
                  flex: 1,
                  padding: "0",
                  boxSizing: "border-box",
                  paddingRight: "1rem",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: theme.palette.secondary.contrastText,
                  }}
                  aria-label="Next steps"
                >
                  Next steps
                </Typography>

                <Typography variant="subtitle2">{description}</Typography>
              </Box>

              {!isMdUp && (
                <Box
                  className="ImageBox"
                  sx={{
                    flexShrink: 0,
                    marginLeft: { md: "1rem" },
                    marginTop: { xs: "1rem", md: 0 },
                    margin: "1.4rem 0",
                  }}
                >
                  {imageComponent}
                </Box>
              )}
            </Box>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={8}
              sx={{
                padding: "0",
                boxSizing: "border-box",
              }}
            >
              {buttonText && (
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    textTransform: "initial",
                    margin: ".7rem 0",
                    borderRadius: "0.25rem",
                    boxShadow: "none",
                    width: "100%",
                    padding: "0",
                    boxSizing: "border-box",
                    "&:hover": {
                      boxShadow: "none",
                      backgroundColour: theme.palette.info.dark,
                    },
                  }}
                  onClick={() =>
                    window.open(
                      recommendationURL,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.info.contrastText,
                      maxHeight: "3.4375rem",
                    }}
                  >
                    {/* Most likely "Show me how" */}
                    {buttonText}
                  </Typography>
                  <Box
                    sx={{
                      margin: "0 0.3rem 0 0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 512 512"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* eslint-disable-next-line react/no-unknown-property */}
                      <path
                        d="M384 224V408C384 413.253 382.965 418.454 380.955 423.307C378.945 428.16 375.999 432.57 372.284 436.284C368.57 439.999 364.16 442.945 359.307 444.955C354.454 446.965 349.253 448 344 448H104C93.3913 448 83.2172 443.786 75.7157 436.284C68.2143 428.783 64 418.609 64 408V168C64 157.391 68.2143 147.217 75.7157 139.716C83.2172 132.214 93.3913 128 104 128H271.48"
                        stroke="black"
                        strokeWidth="55"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* eslint-disable-next-line react/no-unknown-property */}
                      <path
                        d="M336 64H448V176"
                        stroke="black"
                        strokeWidth="55"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* eslint-disable-next-line react/no-unknown-property */}
                      <path
                        d="M224 288L440 72"
                        stroke="black"
                        strokeWidth="55"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                </Button>
              )}
            </Grid>
          </Grid>

          {isMdUp && (
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                padding: "0",
                boxSizing: "border-box",
              }}
            >
              <Box
                className="ImageBox"
                sx={{
                  margin: "1.4rem 0",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {imageComponent}
              </Box>
            </Grid>
          )}
        </Grid>

        <Typography variant="body1">
          Sign me up to the mailing list for updates & toolkits for
          electrification:
        </Typography>

        <Box
          sx={{
            margin: "0.6rem 0 1.5rem 0",
          }}
        >
          <MailchimpForm theme={theme} />
        </Box>
      </SavingsFrameBox>
    </Box>
  );
};

export default HouseholdSavings;

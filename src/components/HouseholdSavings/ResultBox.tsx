import React, { useState } from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { formatNZD } from "src/shared/utils/formatters";

interface BulletPoint {
  label: string;
  value?: number;
}

interface ResultBoxState {
  label: string;
  heading: string | number;
  subheading?: string | number;
  bulletPoints?: BulletPoint[];
  paragraph?: string;
  linkText?: string;
  linkURL?: string;
  children?: React.ReactNode;
}

const ResultBox: React.FC<ResultBoxState> = ({
  label,
  heading,
  subheading,
  bulletPoints,
  paragraph,
  children,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={{
        margin: "1.2rem 0",
      }}
    >
      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        {label}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          margin: "0.8rem 0 0.2rem 0",
        }}
      >
        {heading}
      </Typography>
      {subheading && (
        <Typography variant="body2">
          <span style={{ fontWeight: "600" }}>{subheading}&nbsp;</span>
          {bulletPoints && (
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                textDecorationLine: "underline",
                display: "inline-block",
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "(hide details)" : "(show details)"}
            </Typography>
          )}
        </Typography>
      )}
      {bulletPoints && isExpanded && (
        <>
          <Box
            component="ul"
            sx={{
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginBottom: "0.8rem",
            }}
          >
            {bulletPoints.map((point, i) => (
              <Typography
                key={i}
                component="li"
                variant="body2"
                sx={{
                  lineHeight: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {point.label}:
                </span>

                {typeof point.value === "string"
                  ? point.value
                  : formatNZD(point.value, 0)}
              </Typography>
            ))}
          </Box>
          <Typography variant="body2">
            This shows only the cost of electric alternatives, without comparing
            the cost of replacing with fossil fuel models as machines break. In
            reality, the cost of electrification is lower; it is just the
            difference between electric and fossil fuel counterparts.
          </Typography>
        </>
      )}

      {paragraph && <Typography variant="body2">{paragraph}</Typography>}

      {children}
    </Box>
  );
};

export default ResultBox;

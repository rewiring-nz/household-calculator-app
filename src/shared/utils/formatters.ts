import { EmissionsValues, OpexValues } from "../api/openapi-client";

export const formatNZD = (value: number | undefined, decimals = 2) => {
  if (value === undefined) return "";
  let formattedValue = value.toFixed(decimals);
  if (decimals === 0) {
    formattedValue = Math.round(value).toString();
  } else {
    formattedValue = value.toFixed(decimals);
  }
  const output = Number(formattedValue).toLocaleString("en-NZ", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return ` $${output}`;
};

export const formatSavingsNZD = (value: number | undefined, decimals = 2) => {
  if (value === undefined) return "";
  const roundedValue = roundToSigFigs(value);
  const formattedValue = roundedValue.toFixed(decimals);
  const absoluteValue = Math.abs(Number(formattedValue)).toLocaleString(
    "en-NZ",
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    },
  );
  return value <= 0 ? `$${absoluteValue}` : `-$${absoluteValue}`;
};

export const roundToSigFigs = (value: number | undefined, sigFigs?: number) => {
  /* Rounds to 2sf if below 10,000, 3sf for 10,000s or more */
  if (value === undefined) {
    return 0;
  }
  if (sigFigs !== undefined) {
    return Number(value.toPrecision(sigFigs));
  }
  if (Math.abs(value) < 10) {
    return Number(value.toPrecision(2));
  }
  if (Math.abs(value) < 100) {
    return Number(value.toPrecision(3));
  }
  if (Math.abs(value) < 10000) {
    return Number(value.toPrecision(2));
  }
  return Number(value.toPrecision(3));
};

export const formatTonnes = (value: number | undefined): string => {
  if (value === undefined) return "";
  return `${((value / 1000) * -1).toFixed(0)}`;
};

export const formatKgs = (value: number | undefined): string => {
  if (value === undefined) return "";
  if (value === 1) return `${(value * -1).toFixed(0)} kg `;
  return `${(value * -1).toFixed(0)} kgs `;
};

export const calcPercentage = (
  numberObject: EmissionsValues | OpexValues | undefined,
): number => {
  if (numberObject) {
    const percentDecimal =
      (numberObject?.difference ?? 0) / (numberObject?.before ?? 1);
    const percentString = Math.round(percentDecimal * -100);
    return percentString;
  } else {
    return 0;
  }
};

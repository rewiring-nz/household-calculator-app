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
  const formattedValue = value.toFixed(decimals);
  const absoluteValue = Math.abs(Number(formattedValue)).toLocaleString(
    "en-NZ",
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    },
  );
  return value <= 0 ? `$${absoluteValue}` : `-$${absoluteValue}`;
};

export const roundToHundreds = (value: number | undefined) => {
  return Math.round((value || 0) / 100) * 100
}

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

import React from "react";
import { Radio, RadioProps } from "@mui/material";

export const HouseRadio: React.FC<RadioProps> = (props) => {
  return <Radio disableRipple color="default" {...props} />;
};

export default HouseRadio;

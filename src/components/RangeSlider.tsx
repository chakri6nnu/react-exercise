import React, { useState, useRef } from "react";
import { Box, Typography, Slider } from "@mui/material";
import { RangeSliderProps } from "../modals";

const RangeSlider: React.FC<RangeSliderProps> = ({
  initialMin,
  initialMax,
  min,
  max,
  onChange,
}) => {
  const [value, setValue] = useState<number[]>([initialMin, initialMax]);
  const timeoutRef = useRef<any | null>(null);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange((newValue as number[])[0], (newValue as number[])[1]);
    }, 500);
  };

  return (
    <Box sx={{ width: "90%", margin: "0", "border-top": "1px solid" }}>
      <Typography mb={2} mt={2} variant="h6" component="h6">
        Filters
      </Typography>
      <Typography gutterBottom>Select Spend Range</Typography>
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default RangeSlider;

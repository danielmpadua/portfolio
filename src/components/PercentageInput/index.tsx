import { Box, OutlinedInput, OutlinedInputProps } from "@mui/material";

export const PercentageInput = (props: OutlinedInputProps) => {
  return (
    <OutlinedInput
      {...props}
      type="number"
      size="small"
      sx={{ maxWidth: "100px" }}
      endAdornment={<Box ml={1}>%</Box>}
    />
  );
};

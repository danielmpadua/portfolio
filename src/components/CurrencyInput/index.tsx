import {
  Box,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value?: number } }) => void;
  name: string;
}

const numberFormat = React.forwardRef<NumberFormat<any>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        allowLeadingZeros
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values?.floatValue,
            },
          });
        }}
      />
    );
  }
);

export const CurrencyInput = (props: OutlinedInputProps) => {
  return (
    <OutlinedInput
      {...props}
      size="small"
      // eslint-disable-next-line
      inputComponent={numberFormat as any}
      startAdornment={<Box mr={1}>R$</Box>}
    />
  );
};

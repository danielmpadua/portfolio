import { TableCell, TableRow, Typography } from "@mui/material";
import { TRowContent } from ".";

type TTotalRow = {
  layer?: number;
  rows?: TRowContent[];
  maxValue?: number;
};

export const TotalRow = ({ layer = 1, rows, maxValue }: TTotalRow) => {
  const sumTotal = (values?: number[]) => {
    let result = 0;
    values?.forEach((value) => {
      result += value;
    });

    return result;
  };

  const totalPercentage = sumTotal(
    rows?.map((row) => row?.percentage as number)
  );
  const totalValue = sumTotal(rows?.map((row) => row?.value as number));

  const fontColor = () => {
    if (totalPercentage > 100 || totalValue > (maxValue || 0)) return "red";
    return "black";
  };

  const rowColor = () => {
    if (totalPercentage > 100 || totalValue > (maxValue || 0))
      return "rgba(255,0,0,0.1)";
    return "white";
  };

  return (
    <TableRow sx={{ background: rowColor() }}>
      <TableCell sx={{ width: "33.3%", pl: layer + 5 }}>
        <Typography
          sx={{ opacity: layer > 1 ? 0.6 : 1 }}
          fontWeight={700}
          color={fontColor()}
        >
          Total
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ width: "33.3%" }}>
        <Typography
          sx={{ opacity: layer > 1 ? 0.6 : 1 }}
          fontWeight={700}
          color={fontColor()}
        >
          {totalPercentage}%
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ width: "33.3%" }}>
        <Typography
          sx={{ opacity: layer > 1 ? 0.6 : 1 }}
          fontWeight={700}
          color={fontColor()}
        >
          R${totalValue}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

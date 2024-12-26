import { ChangeEvent, useEffect, useState } from "react";
import {
  handlePercentageLimit,
  handleValueLimit,
  ruleOfThree,
} from "../../../../utils/finance";
import {
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import { PercentageInput } from "../../../../components/PercentageInput";
import { CurrencyInput } from "../../../../components/CurrencyInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TRowContent } from ".";

export const IncomeRow = ({
  row,
  availableCash,
  currentIndex,
  handleChangeContent,
  layer = 1,
  pathIndex,
}: {
  row: TRowContent;
  availableCash?: number;
  currentIndex: number;
  layer?: number;
  pathIndex: number[];
  handleChangeContent: (
    content: TRowContent,
    index: number,
    pathIndex: number[]
  ) => void;
}) => {
  const [open, setOpen] = useState(false);

  const onChangeIncomeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value as unknown as number;
    const optionalValue = handleValueLimit(
      isNaN(newValue) ? undefined : newValue,
      availableCash,
      0
    );

    handleChangeContent(
      {
        ...row,
        value: optionalValue,
        percentage: ruleOfThree(availableCash, 100, optionalValue),
      },
      currentIndex,
      pathIndex
    );
  };

  const onChangeIncomePercentage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value as unknown as string;
    const optionalValue = handlePercentageLimit(
      isNaN(Number(newValue)) ? undefined : Number(newValue)
    );

    handleChangeContent(
      {
        ...row,
        value: ruleOfThree(100, availableCash, optionalValue),
        percentage: optionalValue,
      },
      currentIndex,
      pathIndex
    );
  };

  useEffect(() => {
    if (!!availableCash || availableCash === 0) {
      handleChangeContent(
        {
          ...row,
          value: ruleOfThree(100, availableCash, row?.percentage),
          percentage: row?.percentage,
        },
        currentIndex,
        pathIndex
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCash]);

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: "33.3%", pl: layer }}>
          <IconButton
            disabled={!row?.items?.length}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ mr: 1, opacity: !!row?.items?.length ? 1 : 0 }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row?.name}
        </TableCell>

        <TableCell align="center" sx={{ width: "33.3%" }}>
          <PercentageInput
            value={row?.percentage}
            onChange={onChangeIncomePercentage}
          />
        </TableCell>
        <TableCell align="center" sx={{ width: "33.3%" }}>
          <CurrencyInput value={row?.value} onChange={onChangeIncomeValue} />
        </TableCell>
      </TableRow>

      {row?.items?.length && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                sx={{ minWidth: 650, padding: 0, margin: 0 }}
                aria-label="Distribution Table"
                size="small"
              >
                {row?.items?.map((item, index) => (
                  <IncomeRow
                    key={item?.name}
                    row={item}
                    availableCash={row?.value}
                    currentIndex={index}
                    handleChangeContent={handleChangeContent}
                    layer={layer + 1}
                    pathIndex={[...pathIndex, index]}
                  />
                ))}
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

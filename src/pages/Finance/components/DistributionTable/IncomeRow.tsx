import { ChangeEvent, useEffect, useState } from "react";
import {
  handlePercentageLimit,
  handleValueLimit,
  ruleOfThree,
} from "../../../../utils/finance";
import {
  Box,
  Button,
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
import { TotalRow } from "./TotalRow";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
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
  const [openAdd, setOpenAdd] = useState(false);

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
      <TableRow sx={{ background: layer % 2 === 0 ? "whitesmoke" : " white" }}>
        <TableCell
          sx={{
            width: "33.3%",
            pl: layer,
            borderBottom: openAdd ? "1px solid white" : undefined,
          }}
        >
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

        <TableCell
          align="center"
          sx={{
            width: "33.3%",
            borderBottom: openAdd ? "1px solid white" : undefined,
          }}
        >
          <PercentageInput
            value={row?.percentage}
            onChange={onChangeIncomePercentage}
          />
        </TableCell>
        <TableCell
          align="center"
          sx={{
            width: "33.3%",
            borderBottom: openAdd ? "1px solid white" : undefined,
            paddingLeft: !!row?.addIncome ? 5 : 0,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box />

            <CurrencyInput value={row?.value} onChange={onChangeIncomeValue} />

            {!!row?.addIncome ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenAdd((prev) => !prev)}
                  sx={{ ml: 1 }}
                >
                  {openAdd && <RemoveCircleOutlineRoundedIcon />}
                  {!openAdd && <AddCircleOutlineRoundedIcon />}
                </IconButton>
              </Box>
            ) : (
              <Box />
            )}
          </Box>
        </TableCell>
      </TableRow>

      {openAdd && (
        <TableRow sx={{ background: "white" }}>
          <TableCell sx={{ width: "100%" }} colSpan={6}>
            <Box>Especificar investimento</Box>
            <Box>Nome</Box>
            <Box>%</Box>
            <Box>valor</Box>
            <Button onClick={() => setOpenAdd(false)} color="secondary">
              Cancelar
            </Button>
            <Button onClick={() => setOpenAdd(false)} color="primary">
              Confirmar
            </Button>
          </TableCell>
        </TableRow>
      )}

      {row?.items?.length && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                sx={{ minWidth: 650, padding: 0, margin: 0 }}
                aria-label="Distribution Table"
                size="small"
              >
                <TotalRow
                  layer={layer + 1}
                  rows={row?.items}
                  maxValue={row?.value}
                />

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

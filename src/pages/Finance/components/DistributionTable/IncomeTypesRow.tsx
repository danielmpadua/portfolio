import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import { TIncome } from "../..";

export const IncomeTypesRow = ({
  availableCash,
  name,
  children,
  income,
  setIncome,
  layer = 1,
  bgColor = "#fff",
}: {
  name: string;
  availableCash?: number;
  children?: ReactNode;
  income: TIncome;
  setIncome: Dispatch<SetStateAction<TIncome>>;
  layer?: number;
  bgColor?: string;
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

    setIncome({
      value: optionalValue,
      percentage: ruleOfThree(availableCash, 100, optionalValue),
    });
  };

  const onChangeIncomePercentage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value as unknown as number;
    const optionalValue = handlePercentageLimit(
      isNaN(newValue) ? undefined : newValue
    );

    setIncome({
      value: ruleOfThree(100, availableCash, optionalValue),
      percentage: optionalValue,
    });
  };

  useEffect(() => {
    setIncome({
      value: ruleOfThree(100, availableCash, income?.percentage),
      percentage: income?.percentage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCash]);

  return (
    <>
      <TableRow sx={{ background: bgColor }}>
        <TableCell sx={{ width: "33.3%", pl: layer }}>
          <IconButton
            disabled={!children}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ mr: 1, opacity: !!children ? 1 : 0 }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {name}
        </TableCell>

        <TableCell align="center" sx={{ width: "33.3%" }}>
          <PercentageInput
            value={income?.percentage}
            onChange={onChangeIncomePercentage}
          />
        </TableCell>
        <TableCell align="center" sx={{ width: "33.3%" }}>
          <CurrencyInput value={income?.value} onChange={onChangeIncomeValue} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table
              sx={{ minWidth: 650, padding: 0, margin: 0 }}
              aria-label="Distribution Table"
              size="small"
            >
              {children}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

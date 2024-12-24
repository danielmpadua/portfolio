import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { IncomeTypesRow } from "./IncomeTypesRow";
import { useState } from "react";
import { TIncome } from "../..";

type TDistributionTable = {
  availableCash?: number;
};

export type TRowContent = {
  name: string;
  percentage?: number;
  value?: number;
  items?: TRowContent[];
};

export const DistributionTable = ({ availableCash }: TDistributionTable) => {
  const [fixedIncome, setFixedIncome] = useState<TIncome>({});
  const [variableIncome, setVariableIncome] = useState<TIncome>({});
  const [cdb, setCdb] = useState<TIncome>({});
  const [lci, setLci] = useState<TIncome>({});
  const [lca, setLca] = useState<TIncome>({});
  const [tesouro, setTesouro] = useState<TIncome>({});

  const [etf, setEtf] = useState<TIncome>({});
  const [fii, setFii] = useState<TIncome>({});
  const [acao, setAcao] = useState<TIncome>({});

  const sumTotal = (values: number[]) => {
    let result = 0;
    values?.forEach((value) => {
      result += value;
    });

    return result;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="Distribution Table"
        size="small"
      >
        <TableHead sx={{ background: "#e3e3e3" }}>
          <TableRow>
            <TableCell sx={{ width: "33.3%" }}>Tipo de investimento</TableCell>
            <TableCell align="center" sx={{ width: "33.3%" }}>
              % a ser investido
            </TableCell>
            <TableCell align="center" sx={{ width: "33.3%" }}>
              Valor a ser investido
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <IncomeTypesRow
            name="Renda Fixa"
            income={fixedIncome}
            setIncome={setFixedIncome}
            availableCash={availableCash}
          >
            <TableRow sx={{ background: "whitesmoke" }}>
              <TableCell sx={{ width: "33.3%", pl: 7 }}>
                <Typography fontWeight={700} color="grey">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "33.3%" }}>
                <Typography fontWeight={700} color="grey">
                  {sumTotal([
                    cdb?.percentage || 0,
                    lci?.percentage || 0,
                    lca?.percentage || 0,
                    tesouro?.percentage || 0,
                  ])}
                  %
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "33.3%" }}>
                <Typography fontWeight={700} color="grey">
                  R$
                  {sumTotal([
                    cdb?.value || 0,
                    lci?.value || 0,
                    lca?.value || 0,
                    tesouro?.value || 0,
                  ])}
                </Typography>
              </TableCell>
            </TableRow>

            <IncomeTypesRow
              name="CDB"
              income={cdb}
              setIncome={setCdb}
              availableCash={fixedIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
            <IncomeTypesRow
              name="LCA"
              income={lca}
              setIncome={setLca}
              availableCash={fixedIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
            <IncomeTypesRow
              name="LCI"
              income={lci}
              setIncome={setLci}
              availableCash={fixedIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
            <IncomeTypesRow
              name="Tesouro Direto"
              income={tesouro}
              setIncome={setTesouro}
              availableCash={fixedIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
          </IncomeTypesRow>

          <IncomeTypesRow
            name="Renda Variavel"
            income={variableIncome}
            setIncome={setVariableIncome}
            availableCash={availableCash}
          >
            <TableRow sx={{ background: "whitesmoke" }}>
              <TableCell sx={{ width: "33.3%", pl: 7 }}>
                <Typography fontWeight={700} color="grey">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "33.3%" }}>
                <Typography fontWeight={700} color="grey">
                  {sumTotal([
                    etf?.percentage || 0,
                    fii?.percentage || 0,
                    acao?.percentage || 0,
                  ])}
                  %
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "33.3%" }}>
                <Typography fontWeight={700} color="grey">
                  R$
                  {sumTotal([
                    etf?.value || 0,
                    fii?.value || 0,
                    acao?.value || 0,
                  ])}
                </Typography>
              </TableCell>
            </TableRow>

            <IncomeTypesRow
              name="ETF"
              income={etf}
              setIncome={setEtf}
              availableCash={variableIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
            <IncomeTypesRow
              name="FII"
              income={fii}
              setIncome={setFii}
              availableCash={variableIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
            <IncomeTypesRow
              name="Ações"
              income={acao}
              setIncome={setAcao}
              availableCash={variableIncome?.value}
              layer={2}
              bgColor="whitesmoke"
            />
          </IncomeTypesRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell sx={{ width: "33.3%" }}>
              <Typography fontWeight={700} color="#000">
                Total
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ width: "33.3%" }}>
              <Typography fontWeight={700} color="#000">
                {sumTotal([
                  fixedIncome?.percentage || 0,
                  variableIncome?.percentage || 0,
                ])}
                %
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ width: "33.3%" }}>
              <Typography fontWeight={700} color="#000">
                R$
                {sumTotal([
                  fixedIncome?.value || 0,
                  variableIncome?.value || 0,
                ])}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

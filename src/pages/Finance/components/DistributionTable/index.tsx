import {
  Box,
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

import { useState } from "react";
import { IncomeRow } from "./IncomeRow";
import { TotalRow } from "./TotalRow";

type TDistributionTable = {
  availableCash?: number;
};

export type TRowContent = {
  name: string;
  percentage?: number;
  value?: number;

  items?: TRowContent[];
};

const defautTableContent: TRowContent[] = [
  {
    name: "Renda Fixa",
    percentage: 0,
    value: 0,
    items: [
      {
        name: "CDB",
        percentage: 0,
        value: 0,
      },
      {
        name: "LCI",
        percentage: 0,
        value: 0,
      },
      {
        name: "LCA",
        percentage: 0,
        value: 0,
      },
      {
        name: "Tesouro Direto",
        percentage: 0,
        value: 0,
      },
    ],
  },
  {
    name: "Renda Variavel",
    percentage: 0,
    value: 0,
    items: [
      {
        name: "FII",
        percentage: 0,
        value: 0,
      },
      {
        name: "Ações",
        percentage: 0,
        value: 0,
        items: [
          { name: "Ações2", percentage: 0, value: 0 },
          { name: "Ações3", percentage: 0, value: 0 },
        ],
      },
      {
        name: "ETF",
        percentage: 0,
        value: 0,
      },
    ],
  },
];

export const DistributionTable = ({ availableCash }: TDistributionTable) => {
  const [tableContent, setTableContent] =
    useState<TRowContent[]>(defautTableContent);

  const handleRecursiveChange = (
    row: TRowContent,
    content: TRowContent,
    contentIndex: number,
    rowIndex: number,
    pathIndex: number[]
  ) => {
    if (rowIndex === pathIndex[0]) {
      const updatePathIndex = pathIndex?.filter((_, i) => i !== 0);
      if (!!updatePathIndex?.length) {
        const newRow: TRowContent = {
          ...row,
          items: row?.items?.map((item, itemIndex) =>
            handleRecursiveChange(
              item,
              content,
              contentIndex,
              itemIndex,
              updatePathIndex
            )
          ),
        };
        return newRow;
      }
      return content;
    }
    return row;
  };

  const handleChangeContent = (
    content: TRowContent,
    contentIndex: number,
    pathIndex: number[]
  ) => {
    setTableContent((prev) =>
      prev?.map((currRow, currIndex) => {
        return handleRecursiveChange(
          currRow,
          content,
          contentIndex,
          currIndex,
          pathIndex
        );
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="Distribution Table"
          size="small"
        >
          <TableHead sx={{ background: "#e3e3e3" }}>
            <TableRow>
              <TableCell sx={{ width: "33.3%" }}>
                Tipo de investimento
              </TableCell>
              <TableCell align="center" sx={{ width: "33.3%" }}>
                % a ser investido
              </TableCell>
              <TableCell align="center" sx={{ width: "33.3%" }}>
                Valor a ser investido
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TotalRow rows={tableContent} maxValue={availableCash} />

            {tableContent?.map((row, index) => (
              <IncomeRow
                key={row?.name}
                row={row}
                availableCash={availableCash}
                currentIndex={index}
                handleChangeContent={handleChangeContent}
                pathIndex={[index]}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

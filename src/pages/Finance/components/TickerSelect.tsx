import { useEffect, useState } from "react";
import { FinanceService } from "../../../services/Finance.service";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  FilterOptionsState,
  TextField,
} from "@mui/material";

export type TTicker = {
  code: string;
  name: string;
};

type TTickerSelect = {
  symbols: string[];
  onChange: (value: string, tickers: TTicker[]) => void;
};

export const TickerSelect = ({ symbols, onChange }: TTickerSelect) => {
  const [tickers, setTickers] = useState<TTicker[]>([]);
  const [tickerlInput, setTickerlInput] = useState("");
  const [ticker, setTicker] = useState<TTicker>();

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const getAllTickers = () => {
    FinanceService.getTickersList()
      .then(({ data }) => {
        const tickersCode = Object.keys(data?.data);
        setTickers(
          tickersCode?.map((code) => {
            return { code: code, name: data?.data[code]?.nomeCurto };
          })
        );
      })
      .catch((err) => console.log("error: ", err));
  };

  useEffect(() => {
    getAllTickers();
  }, []);

  return (
    <Autocomplete
      id="ticker-select"
      sx={{ width: 300 }}
      size="small"
      options={
        tickers
          ?.filter((tick) => !symbols?.includes(`${tick?.code}.SA`))
          ?.map((tick) => tick?.code) || []
      }
      value={ticker?.code || ""}
      filterOptions={(
        options: unknown[],
        state: FilterOptionsState<unknown>
      ) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
      }}
      onChange={(_, newValue) => {
        onChange(newValue as string, tickers);
        setTicker(undefined);
        setTickerlInput("");
      }}
      inputValue={tickerlInput || ""}
      onInputChange={(_, newInputValue) => {
        setTickerlInput(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      autoHighlight
      getOptionLabel={(option) => (option as string) || ""}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" {...optionProps}>
            {option as string} (
            {tickers?.find((tick) => tick?.code === option)?.name})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Selecione uma opção" />
      )}
    />
  );
};

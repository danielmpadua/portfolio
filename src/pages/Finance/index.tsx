import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import protobuf from "protobufjs";
// @ts-ignore
import proto from "./YPricingData.proto";
import { TickerSelect } from "./components/TickerSelect";
import { CurrencyInput } from "../../components/CurrencyInput";

import { DistributionTable } from "./components/DistributionTable";
const { Buffer } = require("buffer/");

export type TIncome = {
  percentage?: number;
  value?: number;
};

export const Finance = () => {
  const [quotes, setQuotes] = useState<any>();
  const [symbols, setSymbols] = useState<string[]>([]);
  const [availableCash, setAvailableCash] = useState<number | undefined>(0);

  const onChangeTicker = (newValue: string) => {
    if (newValue && !symbols?.includes(newValue as string))
      setSymbols((prev) => [...prev, `${newValue}.SA`]);
  };

  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");

    protobuf.load(proto, (err, root) => {
      if (err) return console.log(err);

      const Yaticker = root?.lookupType("yaticker");

      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: symbols,
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(message) {
        console.log(Yaticker?.decode(new Buffer(message.data, "base64")));
        setQuotes(Yaticker?.decode(new Buffer(message.data, "base64")));
      };
    });

    return () => {
      console.log("closing");
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          background: "orange",
          width: "100%",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="whitesmoke">
          As cotações são fornecidas mediante o funcionamento da bolsa de
          valores
        </Typography>
      </Box>

      <Box
        sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">Distribuição de Investimentos</Typography>
        <Box>
          <Typography>Valor disponível para investir: </Typography>
          <CurrencyInput
            value={availableCash}
            size="small"
            onChange={(e) => {
              const newValue = e.target.value as unknown as number;
              const optionalValue = isNaN(newValue) ? undefined : newValue;
              setAvailableCash(optionalValue);
            }}
          />
        </Box>

        <DistributionTable availableCash={availableCash} />

        {/* <Box mb={1}>
          Fundos selecionados:{" "}
          {symbols?.map((s) => (
            <Box>{s}</Box>
          ))}
        </Box>

        <TickerSelect symbols={symbols} onChange={onChangeTicker} />

        <Box>
          Prices:
          <Box>
            {quotes?.id}: ${quotes?.price?.toFixed(3)}
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

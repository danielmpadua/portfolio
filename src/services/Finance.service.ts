import axios from "axios";

const getTickersList = (): Promise<any> => {
  return axios.get(
    `https://cvscarlos.github.io/b3-api-dados-historicos/api/v1/tickers-cash-market.json`
  );
};

export const FinanceService = {
  getTickersList,
};

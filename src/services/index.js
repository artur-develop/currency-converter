import axios from "axios";
import { API_KEY, URL } from "../utils";

export const hryvniaRates = (from, to) => {
  return axios
    .get(`${URL}/latest`, {
      params: {
        apikey: API_KEY,
        base: from,
        symbols: to,
      },
    })
    .then((response) => {
      return response.data.rates;
    });
};

export const getAllRateSymbols = () => {
  return axios
    .get(`${URL}/symbols`, {
      params: {
        apikey: API_KEY,
      },
    })
    .then((response) => {
      return Object.keys(response.data.symbols);
    });
};

export const convertCurrency = (to, from, amount, callback) => {
  return axios
    .get(`${URL}/convert`, {
      params: {
        apikey: API_KEY,
        to,
        from,
        amount,
      },
    })
    .then((response) => {
      callback(response.data.result.toFixed(2));
      return true;
    });
};

import { useCallback, useEffect, useState, useContext } from "react";
import { debounce } from "lodash";

import CurrencyInput from "./components/CurrencyInput";
import { convertCurrency, getAllRateSymbols, hryvniaRates } from "./services";
import Header from "./components/Header";
import { Context } from "./context/loading";
import { UAH_RATIO_TO } from "./constants";

import styles from "./App.module.css";

function App() {
  const [amountFrom, setAmountFrom] = useState();
  const [amountTo, setAmountTo] = useState();

  const [currencyFrom, setCurrencyFrom] = useState("UAH");
  const [currencyTo, setCurrencyTo] = useState("USD");

  const [currencies, setCurrencies] = useState([]);
  const [uahExchangeRate, setUahExchangeRate] = useState({});

  const { show, hide } = useContext(Context);

  const debouncedConvertedCurrency = useCallback(
    debounce((to, from, amount, callback) => {
      show();
      convertCurrency(to, from, amount, callback).then(() => hide());
    }, 400),
    []
  );

  useEffect(() => {
    getAllRateSymbols().then((response) => setCurrencies(response));
    hryvniaRates("UAH", UAH_RATIO_TO).then((response) =>
      setUahExchangeRate(response)
    );
  }, []);

  const handleChangeTo = (e) => {
    const value = e.target.value;
    setAmountTo(value);
    debouncedConvertedCurrency(currencyFrom, currencyTo, value, setAmountFrom);
  };

  const handleChangeFrom = (e) => {
    const value = e.target.value;
    setAmountFrom(value);
    debouncedConvertedCurrency(currencyTo, currencyFrom, value, setAmountTo);
  };

  const onSelectTo = (e) => {
    const value = e.target.value;
    setCurrencyTo(value);
    debouncedConvertedCurrency(currencyFrom, value, amountTo, setAmountFrom);
  };

  const onSelectFrom = (e) => {
    const value = e.target.value;
    setCurrencyFrom(value);
    debouncedConvertedCurrency(currencyTo, value, amountFrom, setAmountTo);
  };

  return (
    <div className={styles.app}>
      <div className={styles.convertor_container}>
        <Header uahExchangeRate={uahExchangeRate} />
        <CurrencyInput
          onChange={handleChangeFrom}
          onSelect={onSelectFrom}
          currencies={currencies}
          amount={amountFrom}
          currency={currencyFrom}
        />
        <CurrencyInput
          onChange={handleChangeTo}
          onSelect={onSelectTo}
          currencies={currencies}
          amount={amountTo}
          currency={currencyTo}
        />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import styles from "./CurrencyInput.module.css";

const CurrencyInput = ({
  amount,
  currency,
  currencies,
  onChange,
  onSelect,
}) => {
  return (
    <div className={styles.container}>
      <input
        onChange={onChange}
        type={"number"}
        value={amount}
        className={styles.input_amount}
      />
      <select
        onChange={onSelect}
        value={currency}
        className={styles.select_curr}
      >
        {currencies.map((curr, index) => (
          <option key={index} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;

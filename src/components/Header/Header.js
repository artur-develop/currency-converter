import React from "react";
import styles from "./Header.module.css";

const Header = ({ uahExchangeRate }) => {
  return (
    <div>
      <h1 className={styles.header}>Currency convertor</h1>
      <div className={styles.container}>
        {Object.keys(uahExchangeRate).map((curr, index) => (
          <div key={index} className={styles.rates}>
            <img
              src={`/img/${curr}.svg`}
              alt={curr}
              className={styles.curr_image}
            />
            <div>
              <span>{curr} </span>
              <span className={styles.exchange_number}>
                {(uahExchangeRate[curr] * 1000).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Header);

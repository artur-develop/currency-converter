import React from "react";
import infinityLoader from "./img/infinityLoader.svg";
import styles from "./Loader.module.css";

const Loading = () => {
  return (
    <div className={styles.background}>
      <img className={styles.loader} src={infinityLoader} alt="Loader" />
    </div>
  );
};

export default Loading;

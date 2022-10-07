import React, { useState } from "react";
import { Context } from "../context/loading";
import Loader from "../components/Loader/Loader";

function Loading() {
  return <Loader />;
}

export function LoadingProvider(props) {
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        loading: loading,
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      {loading && <Loading />}
      {props.children}
    </Context.Provider>
  );
}

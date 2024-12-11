import React, { createContext, useContext } from "react";

const BaseUrlContext = createContext("http://10.20.38.88:8000");

export const useBaseUrl = () => useContext(BaseUrlContext);

export const BaseUrlProvider = ({ children }) => {
  const baseUrl = "http://10.20.38.88:8000";
  return (
    <BaseUrlContext.Provider value={baseUrl}>
      {children}
    </BaseUrlContext.Provider>
  );
};

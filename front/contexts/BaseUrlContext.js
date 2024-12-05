import React, { createContext, useContext } from "react";

const BaseUrlContext = createContext("http://192.168.10.3:8000");

export const useBaseUrl = () => useContext(BaseUrlContext);

export const BaseUrlProvider = ({ children }) => {
  const baseUrl = "http://192.168.10.3:8000";
  return (
    <BaseUrlContext.Provider value={baseUrl}>
      {children}
    </BaseUrlContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";

const ALLOWED_CURRENCIES = ["USD", "EUR"];

export const CurrencyContext = createContext({
  currency: "USD",
  updateCurrency: (currency: string) => {},
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("EUR"); // Default USD

  // get the currency and set it to the state if supported; else set to default
  useEffect(() => {
    const currency = localStorage.getItem("currency");
    if (currency && ALLOWED_CURRENCIES.includes(currency)) {
      setCurrency(currency);
    } else {
      setCurrency("EUR");
    }
  }, [currency]);

  const updateCurrency = (currency: string) => {
    if (ALLOWED_CURRENCIES.includes(currency)) {
      localStorage.setItem("currency", currency);
      setCurrency(currency);
    }
  };
  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

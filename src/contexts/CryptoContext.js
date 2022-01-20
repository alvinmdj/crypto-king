import { useState, useEffect, useContext, createContext } from "react"

const Crypto = createContext()

export const CryptoState = () => {
  return useContext(Crypto)
}

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("IDR");
  const [symbol, setSymbol] = useState("Rp");

  useEffect(() => {
    if (currency === "IDR") setSymbol("Rp")
    else setSymbol("$")
  }, [currency])
  
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      { children }
    </Crypto.Provider>
  )
}

export default CryptoContext

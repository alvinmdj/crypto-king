import axios from "axios"
import { useState, useEffect, useContext, createContext } from "react"
import { CoinList, TrendingCoins } from "../configs/api"
import { auth, db } from "../utils/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"

const Crypto = createContext()

export const CryptoState = () => {
  return useContext(Crypto)
}

const CryptoContext = ({ children }) => {
  // Currency & currency symbol state
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  // All coin & trending coins state
  const [coins, setCoins] = useState([])
  const [trending, setTrending] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false)

  // Alert state
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: ''
  })

  // User state
  const [user, setUser] = useState(null)

  // Watchlist state
  const [watchlist, setWatchlist] = useState([])

  // Subscribe to user watchlist changes & unsubscribe after
  useEffect(() => {
    if(user) {
      const coinRef = doc(db, 'watchlist', user.uid)

      const unsubscribe = onSnapshot(coinRef, userWatchlist => {
        if(userWatchlist.exists()) {
          // console.log(userWatchlist.data().coins)
          setWatchlist(userWatchlist.data().coins)
        }
      })

      return () => unsubscribe()
    }
  }, [user])

  // Check user status (authenticated / not)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])

  // Check current currency
  useEffect(() => {
    if (currency === "IDR") setSymbol("Rp")
    else setSymbol("$")
  }, [currency])

  // Get all coin (top 100)
  const fetchCoins = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
    } catch(err) {
      console.log(err.message)
    }
  }

  // Get trending coins
  const fetchTrendingCoins = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(TrendingCoins(currency))
      setTrending(data)
      setLoading(false)
    } catch(err) {
      console.log(err.message)
    }
  }
  
  return (
    <Crypto.Provider value={{ 
      currency, 
      setCurrency,
      symbol, 
      coins,
      loading,
      fetchCoins,
      trending,
      fetchTrendingCoins,
      alert,
      setAlert,
      user,
      watchlist }}
    >
      { children }
    </Crypto.Provider>
  )
}

export default CryptoContext

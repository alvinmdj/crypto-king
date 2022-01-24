import React from 'react'
import { CryptoState } from '../contexts/CryptoContext'

const CoinsTopFive = () => {
  const { coins } = CryptoState()
  
  // Top Gainer
  console.log(coins.map(topCoins => topCoins).sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h
  }).slice(0, 5))

  // Top Loser
  console.log(coins.map(topCoins => topCoins).sort((a, b) => {
    return a.price_change_percentage_24h - b.price_change_percentage_24h
  }).slice(0, 5))

  const topGainer = coins.map(topCoins => topCoins).sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h
  }).slice(0, 5)

  const topLoser = coins.map(topCoins => topCoins).sort((a, b) => {
    return a.price_change_percentage_24h - b.price_change_percentage_24h
  }).slice(0, 5)

  return (
    <div>
      <p>Top Gainer and Loser</p>
      {topGainer.map(coin => (
        <p>{coin.name} - {coin.symbol.toUpperCase()} ({coin.price_change_percentage_24h})</p>
      ))}
      <br />
      {topLoser.map(coin => (
        <p>{coin.name} - {coin.symbol.toUpperCase()} ({coin.price_change_percentage_24h})</p>
      ))}
    </div>
  )
}

export default CoinsTopFive

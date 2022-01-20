import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import { TrendingCoins } from "../../configs/api"
import { CryptoState } from "../../contexts/CryptoContext"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel"

const useStyles = makeStyles(() => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center'
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#FFF"
  }
}))

const Carousel = () => {
  const classes = useStyles()
  
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = CryptoState()

  const formatCurrency = (nominal) => {
    return nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))

    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency]);

  const responsiveCarousel = {
    0: { items: 2 },
    512: { items: 4 }
  }

  const carouselItems = trending.map((coin) => {
    let rise = coin.price_change_percentage_24h >= 0

    return (
      <Link 
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height='80'
          style={{ marginBottom: 10 }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{ 
              color: rise > 0 ? "green" : "red",
              fontWeight: 500
            }}>
            {rise && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {formatCurrency(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  return (
    <div classes={classes.carousel}>
      <AliceCarousel
        autoPlay
        disableDotsControls
        disableButtonsControls
        mouseTracking
        infinite
        responsive={ responsiveCarousel }
        autoPlayInterval={ 1000 }
        animationDuration={ 1500 }
        items={ carouselItems } />
    </div>
  )
}

export default Carousel
import { Link } from "react-router-dom"
import { useEffect } from 'react'
import { makeStyles, CircularProgress } from "@material-ui/core"
import { CryptoState } from "../../contexts/CryptoContext"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel"
import { currencyFormatter } from '../../utils/currencyFormatter'

const useStyles = makeStyles(() => ({
  carousel: {
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    fontWeight: '600',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#EEEEEE"
  }
}))

const Carousel = () => {
  const classes = useStyles()

  const { 
    currency, 
    symbol, 
    loading, 
    trending, 
    fetchTrendingCoins 
  } = CryptoState()

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency]);

  const responsiveCarousel = {
    0: { items: 2 },
    512: { items: 3 },
    1024: { items: 4 }
  }

  const carouselItems = trending.map((coin) => {
    let rise = coin.price_change_percentage_24h > 0

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
              color: rise > 0 ? "#91C483" : "#FF6464",
            }}
          >
            {rise && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 20, fontWeight: 500 }}>
          {symbol}{currencyFormatter(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  return (
    <div classes={classes.carousel}>
    {loading ? (
      <div className={classes.carouselItem}>
        <CircularProgress color="inherit" />
      </div> 
    ) : (
      <AliceCarousel
        autoPlay
        disableDotsControls
        disableButtonsControls
        mouseTracking
        infinite
        responsive={ responsiveCarousel }
        autoPlayInterval={ 1000 }
        animationDuration={ 1500 }
        items={ carouselItems } 
      />
    )}
    </div>
  )
}

export default Carousel

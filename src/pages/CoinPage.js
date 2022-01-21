import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CryptoState } from '../contexts/CryptoContext'
import { SingleCoin } from '../configs/api'
import axios from 'axios'
import parse from 'html-react-parser'
import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import CoinInfo from '../components/CoinInfo'
import { currencyFormatter } from '../utils/currencyFormatter'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey'
  },
  heading: {
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  description: {
    width: '100%',
    fontFamily: 'Open Sans',
    textAlign: 'justify',
    padding: 20,
    paddingTop: 0,
    paddingBottom: 15
  },
  details: {
    alignSelf: 'start',
    paddingRight: 20,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start'
    },
  }
}))

const CoinPage = () => {
  const classes = useStyles()

  const { id } = useParams()

  const [coin, setCoin] = useState()

  const { currency, symbol } = CryptoState()

  const fetchCoinDetail = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoinDetail()
  }, [currency])
  
  if (!coin) return <LinearProgress style={{ backgroundColor: '#FFE162' }} />

  return (
    <div className={classes.container}>
      {/* Sidebar */}
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large}
          alt={coin?.name} 
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h4' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='h4' className={classes.heading}>
          ({coin?.symbol.toUpperCase()})
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {parse(coin?.description.en.split('. ')[0].toString())}.
        </Typography>
        <div className={classes.details}>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>Rank:</Typography>
            <Typography variant='h5' style={{ fontFamily: "Open Sans" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>Current Price:</Typography>
            <Typography variant='h5' style={{ fontFamily: "Open Sans" }}>
              {symbol}
              {currencyFormatter(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>Market Cap:</Typography>
            <Typography variant='h5' style={{ fontFamily: "Open Sans" }}>
            {symbol}
             {currencyFormatter(coin?.market_data.market_cap[currency.toLowerCase()])}
            </Typography>
          </span>
        </div>
      </div>

      {/* Chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage

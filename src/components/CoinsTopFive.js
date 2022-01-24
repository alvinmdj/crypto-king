import { Grid, Container, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../contexts/CryptoContext'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#1A374D',
    padding: 25,
  },
  title: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  itemWrapper: {
    borderRadius: 10,
    backgroundColor: '#142F43',
    maxWidth: 450,
    margin: 10,
    paddingTop: 15,
    paddingBottom: 20,
  },
  items: {
    cursor: 'pointer',
    maxWidth: 350,
    backgroundColor: '#04293A',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    "&:hover": {
      backgroundColor: '#041C32',
    }
  }
}))

const CoinsTopFive = () => {
  const classes = useStyles()

  const { coins } = CryptoState()

  const navigate = useNavigate()
  
  // Top Gainer
  const topGainer = coins.map(topCoins => topCoins).sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h
  }).slice(0, 5)

  // Top Loser
  const topLoser = coins.map(topCoins => topCoins).sort((a, b) => {
    return a.price_change_percentage_24h - b.price_change_percentage_24h
  }).slice(0, 5)

  // If coins is not loaded yet
  if (!coins) return (
    <div className={classes.root}>
      <Container>
        <Typography className={classes.title} variant='h4'>Top Gainers and Losers</Typography>
        <Typography className={classes.title} variant='h5'>(last 24h %)</Typography>
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </Container>
    </div>
  )
 
  return (
    <div className={classes.root}>
      <Container>
        <Typography className={classes.title} variant='h4'>Top Gainers and Losers</Typography>
        
        <Typography style={{ marginBottom: 20 }} className={classes.title} variant='h5'>(last 24 hours %)</Typography>

        <Grid container align="center" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <div className={classes.itemWrapper}>
            <Typography 
              variant='h6' 
              style={{ 
                fontFamily: 'Open Sans', 
                fontWeight: 'bold',
                marginBottom: 20,
                color: "#91C483"
              }}
            >
              🚀 TOP 5 GAINERS 🚀
            </Typography>
            {topGainer.map(coin => {
              const rise = coin.price_change_percentage_24h > 0
              return (
                <div 
                  onClick={() => navigate(`/coins/${coin.id}`)}
                  key={coin.id} 
                  className={classes.items}
                >
                  <img src={coin?.image} alt={coin?.name} height="50" style={{ marginRight: 20 }} />
                  <Typography style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>{coin.symbol.toUpperCase()}&nbsp;</Typography>
                  <Typography
                    style={{ 
                      color: rise ? "#91C483" : "#FF6464",
                    }}
                  >
                    ({rise && "+"}{coin.price_change_percentage_24h.toFixed(2)}%)
                  </Typography>
                </div>
            )})}
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={classes.itemWrapper}>
              <Typography 
                variant='h6' 
                style={{ 
                  fontFamily: 'Open Sans', 
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color: "#FF6464"
                }}
              >
                😱 TOP 5 LOSERS 😱
              </Typography>
              {topLoser.map(coin => {
                const rise = coin.price_change_percentage_24h > 0
                return (
                  <div 
                    onClick={() => navigate(`/coins/${coin.id}`)}
                    key={coin.id} 
                    className={classes.items}
                  >
                    <img src={coin?.image} alt={coin?.name} height="50" style={{ marginRight: 20 }} />
                    <Typography style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>{coin.symbol.toUpperCase()}&nbsp;</Typography>
                    <Typography
                      style={{ 
                        color: rise ? "#91C483" : "#FF6464",
                      }}
                    >
                      ({rise && "+"}{coin.price_change_percentage_24h.toFixed(2)}%)
                    </Typography>
                  </div>
              )})}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default CoinsTopFive

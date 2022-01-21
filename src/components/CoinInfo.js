import { makeStyles, createTheme, ThemeProvider, CircularProgress } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from "../configs/api"
import { CryptoState } from "../contexts/CryptoContext"
import { chartDays } from '../configs/chartDays'
import ChartButton from '../components/ChartButton'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
    type: 'dark',
  },
})

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      paddingTop: 0,
      padding: 20
    }
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%'
  }
}))

const CoinInfo = ({ coin }) => {
  const classes = useStyles()

  const [historicalPrice, setHistoricalPrice] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const fetchCoinHistoricalPrice = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
      setHistoricalPrice(data.prices)
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchCoinHistoricalPrice()
  }, [currency, days])

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicalPrice ? (
            <CircularProgress 
              style={{ color: '#FFE162' }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line 
                data={{
                  labels: historicalPrice.map(price => {
                    let date = new Date(price[0])
                    let time = date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`
                    return days === 1 ? time : date.toLocaleDateString()
                  }),
                  datasets: [
                    {
                      data: historicalPrice.map(price => price[1]),
                      label: `Price (Past ${days} days) in ${currency}`,
                      borderColor: '#FFE162'
                    }
                  ]
                }}
                options={{ 
                  elements: {
                    point: { radius: 1 }
                  }
                }}
              />
              <div className={classes.buttonGroup}>
                {chartDays.map(day => (
                  <ChartButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </ChartButton>
                ))}
              </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo

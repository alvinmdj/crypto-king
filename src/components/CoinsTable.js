import { 
  Container, 
  createTheme, 
  makeStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  ThemeProvider, 
  Typography 
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import { Pagination, Skeleton } from '@material-ui/lab'
import { CryptoState } from '../contexts/CryptoContext'
import { useNavigate } from 'react-router-dom'
import { currencyFormatter } from '../utils/currencyFormatter'

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
    type: 'dark',
  },
})

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#041C32",
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: '#1A374D'
    }
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: '#FFE162'
    }
  }
}))

const CoinsTable = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const { 
    currency, 
    symbol, 
    coins, 
    loading,
    fetchCoins
  } = CryptoState()

  useEffect(() => {
    fetchCoins()
  }, [currency])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant='h4'
          style={{ marginTop: 20, marginBottom: 20, fontFamily: 'Open Sans', fontWeight: 'bold' }}
        >
          Top 100 Cryptocurrencies by Market Cap
        </Typography>
        <TextField
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
          label="What are you looking for?" 
          variant="outlined"
          style={{
            marginBottom: 20,
            width: '100%'
          }}
        />
        {loading ? 
          <LoadingSkeleton /> : 
          <CoinsTableContainer
            coins={coins}
            search={search}
            symbol={symbol}
            page={page}
            setPage={setPage}
          />
        }
      </Container>
    </ThemeProvider>
  )
}

const CoinsTableContainer = ({ coins, search, symbol, page, setPage }) => {
  const classes = useStyles()

  const navigate = useNavigate()

  const headLabels = ["#", "Name", "Price", "24h %", "Market Cap"]

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <>
      <TableContainer style={{ borderRadius: 5 }}>
        <Table>
          <TableHead style={{ backgroundColor: "#FFE162" }}>
            <TableRow>
              {headLabels.map((hlabel) => (
                <TableCell 
                  style={{ 
                    color: "#000",
                    fontWeight: "700",
                    fontFamily: "Open Sans"
                  }}
                  key={hlabel}
                  align={hlabel === "Name" ? "left" : "right"}
                >
                  {hlabel}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                const rise = row.price_change_percentage_24h > 0

                return (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell
                      style={{ fontFamily: "Open Sans", fontWeight: "700" }}
                      component='th'
                      scope='row'
                      align='right'
                    >
                      {row.market_cap_rank}
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      style={{ 
                        display: 'flex',
                        gap: 15
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row?.name}
                        height="50"
                        style={{ marginBottom: 10 }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{ 
                            textTransform: "uppercase",
                            fontSize: 20
                          }}
                        >
                          {row.symbol} 
                        </span>
                        <span style={{ fontFamily: "Open Sans", color: "darkgrey" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align='right'>
                      {symbol}
                      {currencyFormatter(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell 
                      align='right'
                      style={{ 
                        color: rise > 0 ? "#91C483" : "#FF6464",
                        fontFamily: "Open Sans", 
                        fontWeight: 700
                      }}
                    >
                      {rise && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align='right'>
                      {symbol}
                      {currencyFormatter(row.market_cap.toString())}
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>  
      </TableContainer>
      <Pagination 
        count={parseInt((handleSearch()?.length / 10).toFixed(0))}
        onChange={(_, value) => {
          setPage(value)
          window.scroll(0, 450)
        }}
        style={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: 20
        }}
        classes={{ ul: classes.pagination }}
      />
    </>
  )
}

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
    </>
  )
}

export default CoinsTable

import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  makeStyles, 
  ThemeProvider,
} from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../contexts/CryptoContext';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#04293A',
  },
  title: {
    flexGrow: 1,
    color: "#FFE162",
    fontFamily:"Open Sans",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: 'gold'
    }
  },
  currencyItem: {
    fontFamily: "Open Sans",
    fontWeight: 'bold'
  }
}))

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
    type: 'dark',
  },
})

const Header = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  const { currency, setCurrency } = CryptoState()

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar className={classes.root} position='sticky'>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')}
              className={classes.title}
              variant='h6'>
              Crypto King
            </Typography>
            <Select 
              variant='outlined'
              style={{
                width: 90,
                height: 40,
                fontFamily: 'Open Sans',
                fontWeight: 'bold'
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem className={classes.currencyItem} value={"USD"}>USD</MenuItem>
              <MenuItem className={classes.currencyItem} value={"IDR"}>IDR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
};

export default Header

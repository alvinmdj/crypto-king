import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  makeStyles, 
  ThemeProvider
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../contexts/CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily:"Open Sans",
    fontWeight: "bold",
    cursor: "pointer"
  }
}))

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFF',
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
      <AppBar color='transparent' position='static'>
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
                width: 100,
                height: 40,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"IDR"}>IDR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
};

export default Header

import React from 'react'
import { createTheme, ThemeProvider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import { CryptoState } from '../../contexts/CryptoContext'
import { Avatar } from '@material-ui/core'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../utils/firebase'
import { currencyFormatter } from '../../utils/currencyFormatter'
import { MdDelete } from 'react-icons/md'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
    type: 'dark',
  },
})

const useStyles = makeStyles({
  container: {
    fontFamily: 'Open Sans',
    width: 350,
    padding: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#041C32'
  },
  profile: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '90%'
  },
  picture: {
    width: 200,
    height: 200,
    backgroundColor: '#FFE162',
    objectFit: 'contain'
  },
  watchlist: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#04293A',
    borderRadius: 10,
    gap: 12,
    padding: 15,
    paddingTop: 10,
    overflowY: 'scroll'
  },
  signoutBtn: {
    marginTop: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFE162',
    "&:hover": {
      backgroundColor: 'gold'
    }
  },
  watchlistItem: {
    padding: 10,
    borderRadius: 5,
    color: '#000',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE162',
  }
})

export default function UserSidebar() {
  const classes = useStyles()

  const navigate = useNavigate()

  const [state, setState] = React.useState({ right: false })

  const { user, setAlert, coins, symbol, watchlist } = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleSignOut = () => {
    signOut(auth)
    setAlert({
      open: true,
      type: 'success',
      message: 'You have been logged out.'
    })
  }

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid)
  
    try {
      await setDoc(
        coinRef, 
        { coins: watchlist.filter(watch => watch !== coin?.id) }, 
        { merge: 'true' }
      )
  
      setAlert({
        open: true,
        message: `${coin?.name} has been removed from your watchlist!`,
        type: 'info'
      })
    } catch(err) {
      setAlert({
        open: true,
        message: err.message,
        type: 'error'
      })
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Avatar 
              onClick={toggleDrawer(anchor, true)}
              style={{
                marginLeft: 15,
                cursor: 'pointer',
                backgroundColor: '#FFE162',
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <Drawer 
              anchor={anchor} 
              open={state[anchor]} 
              onClose={toggleDrawer(anchor, false)}
            >
              <div className={classes.container}>
                <div className={classes.profile}>
                  <Avatar
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <span
                    style={{ 
                      width: '100%',
                      fontSize: 25,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      wordWrap: 'break-word'
                    }}
                  >
                    {user.displayName || user.email}
                  </span>
                  <div className={classes.watchlist}>
                    <span style={{ fontWeight: 'bold' }}>
                      Watchlist
                    </span>
                    {coins.map(coin => {
                      if(watchlist.includes(coin.id)) {
                        return (
                          <div 
                            key={coin.id} 
                            className={classes.watchlistItem}
                          >
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                              {coin.symbol}
                            </span>
                            <span style={{ display: 'flex', gap: 8 }}>
                              {symbol}
                              {currencyFormatter(coin.current_price.toFixed(2))}
                              <MdDelete
                                style={{ color: '#FF6464', cursor: 'pointer', fontSize: '20' }}
                                onClick={() => removeFromWatchlist(coin)}
                              />
                            </span>
                          </div>
                        )
                      }
                    })}
                    {watchlist.length === 0 && <span>Watchlist still empty...</span>}
                  </div>
                </div>
                <Button
                  variant="contained"
                  className={classes.signoutBtn}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </ThemeProvider>
  )
}

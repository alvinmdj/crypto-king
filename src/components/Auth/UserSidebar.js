import React from 'react'
import { createTheme, ThemeProvider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import { CryptoState } from '../../contexts/CryptoContext'
import { Avatar } from '@material-ui/core'
import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase'

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
  }
})

export default function UserSidebar() {
  const classes = useStyles()
  const [state, setState] = React.useState({ right: false })

  const { user, setAlert } = CryptoState()

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
                    <p style={{ fontWeight: 'bold' }}>Watchlist</p>
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

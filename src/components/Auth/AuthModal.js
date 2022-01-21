import { useState } from 'react'
import { Box, AppBar, Button, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import SignIn from './SignIn'
import SignUp from './SignUp'
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { CryptoState } from '../../contexts/CryptoContext'
import { auth } from '../../utils/firebase'
import { authErrorMessage } from '../../utils/errorHandler'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: '#04293A',
    color: '#EEEEEE',
    borderRadius: 8
  },
  googleSection: {
    gap: 20,
    padding: 25,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: 20
  }
}))

export default function AuthModal() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Google Sign In
  const googleAuthProvider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleAuthProvider)
      setAlert({
        open: true,
        message: `Sign in successful! Welcome ${res.user.email}`,
        type: 'success'
      })
    } catch(err) {
      const message = authErrorMessage(err)
      setAlert({
        open: true,
        message,
        type: 'error'
      })
    }
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ 
          fontWeight: "bold",
          height: 40,
          marginLeft: 15,
          backgroundColor: '#FFE162'
         }}
      >
        Sign In
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position='static' style={{ backgroundColor: 'transparent', color: '#EEEEEE' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant='fullWidth'
                indicatorColor='primary'
                style={{ borderRadius: 10 }}
              >
                <Tab style={{ fontWeight: 'bold' }} label="Sign In" />
                <Tab style={{ fontWeight: 'bold' }} label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 && <SignIn handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}

            <Box className={classes.googleSection}>
              <span>OR</span>
              <GoogleButton
                onClick={signInWithGoogle}
                style={{ 
                  width: '100%',
                  outline: 'none'
                }}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

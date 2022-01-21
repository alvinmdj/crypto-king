import { useState } from 'react'
import { AppBar, Button, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import SignIn from './SignIn'
import SignUp from './SignUp'

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
  }
}))

export default function AuthModal() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

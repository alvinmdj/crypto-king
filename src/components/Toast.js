import { Snackbar } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import { CryptoState } from "../contexts/CryptoContext"

const Toast = () => {
  const { alert, setAlert } = CryptoState()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlert({ open: false })
  }

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        variant='filled'
        severity={alert.type}
      >
        { alert.message }
      </Alert>
    </Snackbar>
  )
}

export default Toast

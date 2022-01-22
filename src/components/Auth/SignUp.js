import { Box, Button, TextField, Typography } from "@material-ui/core"
import { useState } from "react"
import { CryptoState } from '../../contexts/CryptoContext'
import { auth } from '../../utils/firebase'
import { authErrorMessage } from "../../utils/errorHandler"
import { createUserWithEmailAndPassword } from "firebase/auth"

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { setAlert } = CryptoState()

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      setAlert({
        open: true,
        message: "Please fill all the fields.",
        type: 'error'
      })
      return
    }

    if (password !== confirmPassword) {
      setPassword('')
      setConfirmPassword('')
      setAlert({
        open: true,
        message: "Password do not match!",
        type: 'error'
      })
      return
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      
      setAlert({
        open: true,
        message: `Thank you for signing up! Welcome ${res.user.email}`,
        type: 'success'
      })

      handleClose()

    } catch(err) {
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      const message = authErrorMessage(err)
      setAlert({
        open: true,
        message,
        type: 'error'
      })
      return
    }
  }

  return (
    <Box
      p={3}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <Typography
        variant='subtitle1' 
        style={{ textAlign: 'center', fontFamily: 'Open Sans', fontWeight: 'bold' }}
      >
        Sign up now and create your own watchlist!
      </Typography>
      <TextField
        variant='outlined'
        type='email'
        label='Email address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type='password'
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type='password'
        label='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: '#FFE162', fontWeight: 'bold' }}
        onClick={handleSubmit}
      >
        Sign Up Now!
      </Button>
    </Box>
  )
}

export default SignUp

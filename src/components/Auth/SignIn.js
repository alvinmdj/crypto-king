import { Box, Button, TextField } from "@material-ui/core"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { CryptoState } from "../../contexts/CryptoContext"
import { authErrorMessage } from "../../utils/errorHandler"
import { auth } from "../../utils/firebase"

const SignIn = ({ handleClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAlert } = CryptoState()

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields.",
        type: 'error'
      })
      return
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)

      setAlert({
        open: true,
        message: `Welcome back ${res.user.email}!`,
        type: 'success'
      })

      handleClose()
    } catch(err) {
      setEmail('')
      setPassword('')
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: '#FFE162', fontWeight: 'bold' }}
        onClick={handleSubmit}
      >
        Sign In
      </Button>
    </Box>
  )
}

export default SignIn

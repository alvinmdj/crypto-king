import { Box, Button, TextField } from "@material-ui/core"
import { useState } from "react"

const SignIn = ({ handleClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {

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

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Header from './components/Header'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161A',
    color: "white",
    minHeight: "100vh"
  }
}))

function App() {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

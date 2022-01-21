import { Container, makeStyles, Typography } from "@material-ui/core"
import Carousel from "./Carousel"

const useStyles = makeStyles(() => ({
  hero: {
    backgroundImage: 'url(./hero.webp)'
  },
  heroContent: {
    height: 550,
    paddingTop: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
  carousel: {
    display: "flex",
    alignItems: "center",
  },
}))

const Hero = () => {
  const classes = useStyles()

  return (
    <div className={classes.hero}>
      <Container className={classes.heroContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: "Open Sans"
            }}>
            king of cryptos
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ 
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Open Sans",
              fontWeight: 'bold'
            }}>
            View top cryptocurrency prices, crypto market cap, and crypto charts
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Hero

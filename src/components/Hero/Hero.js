import { Container, makeStyles, Typography } from "@material-ui/core"
import Carousel from "./Carousel"

const useStyles = makeStyles(() => ({
  hero: {
    // backgroundImage: 'url(./hero.webp)'
    backgroundImage: 'url(./banner2.jpg)'
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around'
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }
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
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: "Open Sans"
            }}>
            CRYPTO KING
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ 
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Open Sans"
            }}>
            View top cryptocurrency prices, crypto market cap, and crypto charts.
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Hero

import { makeStyles } from "@material-ui/styles"

const ChartButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles(() => ({
    button: {
      width: "20%",
      textAlign: 'center',
      border: "3px solid #FFE162",
      borderRadius: 5,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      fontFamily: "Open Sans",
      cursor: "pointer",
      backgroundColor: selected ? "#FFE162" : "",
      color: selected ? "#000" : "",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "#FFE162",
        color: "#000",
      }
    }
  }))

  const classes = useStyles()

  return (
    <span
      onClick={onClick}
      className={classes.button}
    >
      {children}
    </span>
  )
}

export default ChartButton
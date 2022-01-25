import React from "react";
import styles from "../styles/Home.module.css";
import { Button, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  headerHeading: {
    marginBottom: 100,
  },
  headerBtn: {
    width: 230,
    height: 46,
    borderRadius: 40,
  },
  headerPremiumBtn: {
    backgroundColor: "transparent",
    backgroundImage:
      "linear-gradient(to right, #35EDFB -8%, #2D9BEF 60%, #9B2DEF 105%)",
    // filter: "drop-shadow(0 0 20px #0022ffbf)",
    filter: "drop-shadow(0 0 20px #007effb3)",

    marginRight: 20,
    transition: "all .3s",
    "&:hover": {
      // filter: "drop-shadow(0 0 20px #0022FF)",
      filter: "drop-shadow(0 0 20px #007eff)",
    },
    "&:active": {
      // filter: "drop-shadow(0 0 20px #0022ffbf)",
      filter: "drop-shadow(0 0 20px #007effb3)",
    },
  },
  headerBtnText: {
    letterSpacing: "6",
  },
  headerText: {
    lineHeight: "19px",
    marginTop: 22,
  },
  headerTextBold: {
    color: "#2DCEEF",
    fontWeight: "bold",
    marginLeft: 6,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.innerContainer}>
          <Typography
            variant="h3"
            color="primary"
            className={classes.headerHeading}
          >
            Open the world of music. It's all here.
          </Typography>

          <Button
            disableElevation
            className={`${classes.headerBtn} ${classes.headerPremiumBtn}`}
            variant="contained"
          >
            <Typography
              className={classes.headerBtnText}
              variant="body2"
              color="primary"
            >
              MUSICBOX PREMIUM
            </Typography>
          </Button>

          <Button
            disableElevation
            className={classes.headerBtn}
            variant="outlined"
            color="primary"
          >
            <Typography
              className={classes.headerBtnText}
              variant="body2"
              color="primary"
            >
              MUSICBOX Free
            </Typography>
          </Button>

          <Typography
            variant="subtitle2"
            className={classes.headerText}
            color="primary"
          >
            1-month free trial
            <span className={classes.headerTextBold}> $7.99</span>/month after
          </Typography>
        </div>
      </header>
    </React.Fragment>
  );
}

import React, { useEffect } from "react";
import styles from "../styles/LandingPage.module.css";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import Image from "next/image";
import flowPhoneImg from "../assets/img/flow-phone.png";
import headerLogo from "../assets/img/header-logo.png";
import findMusicPhoneImg from "../assets/img/find-music-phone.png";
import Flow from "../components/icons/Flow";
import Divider from "../components/partials/Divider/Divider";
import { useAppContext } from "../store/context/appContext";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
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
  headerFreeBtn: {
    border: "2px solid #fff",
    "&:hover": {
      border: "2px solid #fff",
    },
  },
  headerBtnText: {
    letterSpacing: "6",
  },
  headerText: {
    lineHeight: "19px",
    marginTop: 22,
  },
  skyBlueBoldText: {
    color: "#2DCEEF",
    fontWeight: "bold",
    marginLeft: 6,
  },
  flowInnerContainer: {
    maxWidth: 1405,
    margin: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flowTextHeading: {
    lineHeight: "32px",
  },
  listenAnytimeHeading: {
    marginBottom: 36,
  },
  findMusicHeading: {
    marginBottom: 36,
  },
  findMusicInnerContainer: {
    maxWidth: 1400,
    margin: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body1: {
    lineHeight: "35px",
  },
});

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const { accessToken } = useAppContext();

  useEffect(() => {
    if (!accessToken) return;
    if (router.pathname === "/") {
      router.push("/home");
    }
  }, [accessToken]);

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.headerInnerContainer}>
          <div className={styles.headerHeadingContainer}>
            <div className={styles.headerLogoContainer}>
              <Image src={headerLogo} alt="logo" />
            </div>
            <Typography variant="h3" color="primary">
              Open the world of music. It's all here.
            </Typography>
          </div>

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
            className={`${classes.headerFreeBtn} ${classes.headerBtn}`}
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
            <span className={classes.skyBlueBoldText}> $7.99</span>/month after
          </Typography>
        </div>
      </header>

      {/*// section flow */}
      <Divider />
      <section className={styles.flow}>
        <Grid container className={classes.flowInnerContainer}>
          <Grid item className={styles.flowImageContainer}>
            <Image src={flowPhoneImg} alt="phone-img" />
          </Grid>
          <Grid item className={styles.flowTextContainer}>
            <div className={styles.flowTextHeadingContainer}>
              <Flow />
              <Typography
                variant="h2"
                className={classes.flowTextHeading}
                color="primary"
              >
                FLOW
              </Typography>
            </div>
            <Typography
              variant="body1"
              className={classes.body1}
              color="primary"
            >
              Listen to a personalized mix of tracks based on your
              <br /> listening history, or create your own mix of genres,
              artists
              <br /> and playlists - letting you enjoy more of the music you
              love.
            </Typography>
          </Grid>
        </Grid>
      </section>

      {/*// section listen anytime */}
      <Divider />
      <section className={styles.listenAnytime}>
        <div className={styles.listenAnytimeInnerContainer}>
          <Typography
            variant="h4"
            color="primary"
            className={classes.listenAnytimeHeading}
          >
            Listen anytime, anywhere
          </Typography>
          <Typography variant="body1" className={classes.body1} color="primary">
            All your favorite songs and episodes are always
            <br /> available - even without WiFi or LTE.
          </Typography>
        </div>
      </section>

      {/*// section find the music you want */}
      <Divider />
      <section className={styles.findMusic}>
        <Grid container className={classes.findMusicInnerContainer}>
          <Grid item className={styles.findMusicTextContainer}>
            <Typography
              variant="h4"
              color="primary"
              className={classes.findMusicHeading}
            >
              Find the music you want
            </Typography>
            <Typography
              variant="body1"
              className={classes.body1}
              color="primary"
            >
              Search for your favorite songs using the description,
              <br />
              or turn on the
              <span className={classes.skyBlueBoldText}>MusicFinder</span>
              feature to find the song
              <br />
              that is playing near you.
            </Typography>
          </Grid>

          <Grid item className={styles.findMusicImageContainer}>
            <Image src={findMusicPhoneImg} alt="phone-img" />
          </Grid>
        </Grid>
      </section>
    </React.Fragment>
  );
}

/**
 * to get playlist for category
 */
// spotifyApiCtx.getPlaylistsForCategory("toplists").then((res) => {
//   console.log(res);
// });

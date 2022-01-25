import React from "react";
import styles from "./Layout.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Typography, makeStyles } from "@material-ui/core";
import logo from "../../../assets/img/logo.png";

const useStyles = makeStyles(() => {
  return {
    link: {
      cursor: "pointer",
    },
    downloadLink: {
      marginRight: 40,
    },
    helpLink: {
      marginRight: 60,
    },
    loginBtn: {
      marginRight: 20,
      width: 105,
      height: 35,
      borderRadius: 20,
    },
    signupBtn: {
      width: 119,
      height: 36,
      borderRadius: 20,
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <nav className={styles.nav}>
        <div className={styles.navInnerContainer}>
          <div className={styles.navLogoContainer}>
            <Image src={logo} alt="logo" />
          </div>
          <div className={styles.navBtnContainer}>
            <NextLink href="#">
              <Typography
                className={`${classes.link} ${classes.downloadLink}`}
                variant="subtitle1"
                color="primary"
              >
                Download
              </Typography>
            </NextLink>
            <NextLink href="#">
              <Typography
                className={`${classes.link} ${classes.helpLink}`}
                variant="subtitle1"
                color="primary"
              >
                Help
              </Typography>
            </NextLink>

            <NextLink href="#">
              <Button
                className={`${classes.link} ${classes.loginBtn}`}
                variant="outlined"
                color="primary"
                disableElevation
              >
                Log in
              </Button>
            </NextLink>
            <NextLink href="#">
              <Button
                className={`${classes.link} ${classes.signupBtn}`}
                variant="contained"
                color="primary"
                disableElevation
              >
                Sign up
              </Button>
            </NextLink>
          </div>
        </div>
      </nav>

      <main className={styles.mainContainer}>{children}</main>

      <footer className={styles.footer}>footer</footer>
    </React.Fragment>
  );
};

export default Layout;

import React from "react";
import styles from "./Layout.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Typography, makeStyles, Link } from "@material-ui/core";
import logo from "../../../assets/img/logo.png";
import Divider from "../Divider/Divider";
import Facebook from "../../icons/Facebook";
import Twitter from "../../icons/Twitter";
import Instagram from "../../icons/Instagram";

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
      border: "2px solid #fff",
      "&:hover": {
        border: "2px solid #fff",
      },
    },
    signupBtn: {
      width: 119,
      height: 36,
      borderRadius: 20,
    },
    footerLinkHeading: {
      letterSpacing: ".06",
      lineHeight: "32px",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    footerLink: {
      lineHeight: "32px",
      textTransform: "capitalize",
      cursor: "pointer",
    },
    footerIconBtn: {
      minWidth: 48,
      maxWidth: 48,
      maxHeight: 48,
      padding: 0,

      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    footerBottomLink: {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
      },
    },
  };
});

const footerLinks = [
  {
    heading: "MUSICBOX",
    links: ["About", "Features"],
  },
  {
    heading: "COMMUNITIES",
    links: ["For Artists", "Developers", "press"],
  },
  {
    heading: "USEFUL LINKS",
    links: ["Help", "web player", "Explore Channels", "Download App"],
  },
];

const footerBottomLinks = ["Legal", "Privacy", "Cookies", "Ads"];

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

      <Divider />

      <footer className={styles.footer}>
        <div className={styles.footerInnerContainer}>
          <div className={styles.footerTop}>
            <span className={styles.footerLogoContainer}>
              <Image src={logo} alt="logo" />
            </span>

            <span className={styles.footerLinkContainer}>
              {footerLinks.map((links, i) => {
                return (
                  <span key={i} className={styles.footerLinksInnerContainer}>
                    <Typography
                      variant="caption"
                      className={classes.footerLinkHeading}
                      color="secondary"
                    >
                      {links.heading}
                    </Typography>
                    {links.links.map((link, i) => {
                      return (
                        <Link key={i}>
                          <Typography
                            variant="caption"
                            className={classes.footerLink}
                          >
                            {link}
                          </Typography>
                        </Link>
                      );
                    })}
                  </span>
                );
              })}
            </span>

            <span className={styles.footerIconsContainer}>
              <Button
                className={classes.footerIconBtn}
                disableElevation
                disableTouchRipple
              >
                <Facebook />
              </Button>
              <Button
                className={classes.footerIconBtn}
                disableElevation
                disableTouchRipple
              >
                <Twitter />
              </Button>
              <Button
                className={classes.footerIconBtn}
                disableElevation
                disableTouchRipple
              >
                <Instagram />
              </Button>
            </span>
          </div>

          <div className={styles.footerBottom}>
            <span className={styles.footerBottomLinks}>
              {footerBottomLinks.map((link, i) => {
                return (
                  <Link key={i} className={classes.footerBottomLink}>
                    <Typography
                      variant="overline"
                      style={{ textTransform: "capitalize" }}
                      color="secondary"
                    >
                      {link}
                    </Typography>
                  </Link>
                );
              })}
            </span>

            <span className={styles.footerBottomCopyright}>
              <Typography
                variant="overline"
                color="secondary"
                style={{ textTransform: "none" }}
              >
                © 2022 MusicBox
              </Typography>
            </span>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Layout;

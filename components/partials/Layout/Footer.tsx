import React from "react";
import styles from "./Layout.module.css";
import Image from "next/image";
import { Button, Typography, makeStyles, Link } from "@material-ui/core";
import logo from "../../../assets/img/logo.png";
import Facebook from "../../icons/Facebook";
import Twitter from "../../icons/Twitter";
import Instagram from "../../icons/Instagram";

const useStyles = makeStyles(() => {
  return {
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

const Footer = () => {
  const classes = useStyles();
  return (
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
  );
};

export default Footer;

import React, { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
import NextLink from "next/link";
import {
  Button,
  Typography,
  makeStyles,
  Paper,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Link,
} from "@material-ui/core";
import Popper from "@mui/material/Popper";
import logo from "../../../assets/img/logo.png";
import { useAppContext } from "../../../store/context/appContext";
import { useRouter } from "next/dist/client/router";
import Search from "../../icons/Search";
import User from "../../icons/User";
import DownArrow from "../../icons/DownArrow";

const useStyles = makeStyles({
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
  userName: {
    textTransform: "none",
  },

  afterLoginbtnText: {
    fontWeight: "bold",
    textTransform: "capitalize",
    transition: "all .2s",
    "&:hover": {
      color: "#8b8989",
    },
  },
  afterLoginActiveBtn: {
    borderRadius: 20,
    borderWidth: 3,
    padding: "8px 26px",
    backgroundColor: "#161A1A",
    position: "absolute",
    right: 0,
    marginRight: 0,

    "&:hover": {
      backgroundColor: "#161A1A",
    },
  },
  afterLoginMiddleNavLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      textDecoration: "none",
    },
  },
  afterLoginMiddleNavLinkText: {
    cursor: "pointer",
    textTransform: "capitalize",
  },
  afterLoginBtn: {
    padding: 0,
    marginRight: 25,
  },
  color707070: {
    color: "#707070",
  },
  color2DCEEF: {
    color: "#2DCEEF",
    "&:hover": {
      color: "#2DCEEF",
    },
  },
});

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=e6719168da3047aaa2b0b9be996612f2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Nav() {
  const classes = useStyles();
  const { userInfo, activeNavLinkCtx, setActiveNavLinkCtx } = useAppContext();
  const router = useRouter();
  const path = router.pathname.replace("/", "");
  const [afterLoginMiddleNavLink, setAfterLoginMiddleNavLink] = useState([]);

  useEffect(() => {
    if (router.pathname === "/browse") {
      setAfterLoginMiddleNavLink(["genres", "new releases", "podcasts"]);
      setActiveNavLinkCtx("genres");
    } else if (router.pathname === "/library") {
      setAfterLoginMiddleNavLink(["playlists", "tracks", "albums", "podcasts"]);
      setActiveNavLinkCtx("playlists");
    } else {
      setAfterLoginMiddleNavLink([]);
    }
  }, [router.pathname]);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };
  const navAfterLoginBtns = ["browse", "library", "home"];

  return (
    <nav id="nav" className={styles.nav}>
      {!userInfo ? (
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

            <NextLink href={AUTH_URL}>
              <Button
                className={`${classes.link} ${classes.loginBtn}`}
                variant="outlined"
                color="primary"
                disableElevation
              >
                Log in
              </Button>
            </NextLink>
            <NextLink href={AUTH_URL}>
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
      ) : (
        <div
          className={`${styles.navInnerContainer} ${styles.navInnerContainerAfetLogin}`}
        >
          <span className={styles.displayFlex}>
            <div className={styles.navLogoContainerAfterLogin}>
              <Image src={logo} alt="logo" />
            </div>
            <div className={styles.navBtnContainerAfterLogin}>
              {navAfterLoginBtns.map((btn) => {
                return (
                  <NextLink key={btn} href={`/${btn}`}>
                    <Button
                      variant="text"
                      disableElevation
                      className={`${
                        path.includes(btn)
                          ? classes.afterLoginActiveBtn
                          : classes.afterLoginBtn
                      }`}
                    >
                      {path.includes(btn) && (
                        <div className={styles.afterLoginActiveBtnBorder} />
                      )}
                      <Typography
                        variant="body1"
                        className={`${classes.afterLoginbtnText} ${
                          path.includes(btn)
                            ? classes.color2DCEEF
                            : classes.color707070
                        }`}
                      >
                        {btn}
                      </Typography>
                    </Button>
                  </NextLink>
                );
              })}
            </div>
          </span>

          {afterLoginMiddleNavLink.length > 0 && (
            <div className={styles.afterLoginMiddleNavLinkContainer}>
              {afterLoginMiddleNavLink.map((link) => {
                return (
                  <Link
                    key={link}
                    className={classes.afterLoginMiddleNavLink}
                    onClick={() => setActiveNavLinkCtx(link)}
                  >
                    <Typography
                      variant="subtitle1"
                      className={classes.afterLoginMiddleNavLinkText}
                      color={
                        link === activeNavLinkCtx ? "primary" : "textSecondary"
                      }
                    >
                      {link}
                    </Typography>
                    {activeNavLinkCtx === link && (
                      <span
                        className={styles.afterLoginMiddleNavActiveLinkBottom}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          <span className={styles.displayFlex}>
            <div className={styles.searchInputContainer}>
              <Search />
              <input placeholder="search" className={styles.navInput} />
            </div>
            <div className={styles.navUserOptions}>
              <span className={styles.navUserOptionsUserIcon}>
                {userInfo.image ? (
                  <Image
                    src={userInfo.image.url}
                    loader={() => userInfo.image.url}
                    unoptimized
                    width={30}
                    height={30}
                    alt="img"
                  />
                ) : (
                  <User />
                )}
              </span>
              <div>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  endIcon={<DownArrow />}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    className={classes.userName}
                  >
                    {userInfo.name}
                  </Typography>
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </span>
        </div>
      )}
    </nav>
  );
}

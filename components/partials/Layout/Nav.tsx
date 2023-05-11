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
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => {
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
    userName: {
      textTransform: "none",
      [theme.breakpoints.down(500.1)]: {
        display: "none",
      },
    },

    afterLoginBtnText: {
      fontWeight: "bold",
      textTransform: "capitalize",
      color: "#707070",
      transition: "all .2s",
      "&:hover": {
        color: "#8b8989",
      },
      [theme.breakpoints.down(600.1)]: {
        fontSize: 18,
      },
    },

    afterLoginMiddleNavLink: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      "&:hover": {
        textDecoration: "none",
      },
    },
    afterLoginMiddleNavLinkText: {
      cursor: "pointer",
      textTransform: "capitalize",
      [theme.breakpoints.down(600.1)]: {
        fontSize: 16,
      },
    },
    afterLoginBtn: {
      padding: 0,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
      },
    },
    colorfff: {
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
    navMenuContainer: {
      borderRadius: 4,
      overflow: "hidden",
      left: "auto !important",
      [theme.breakpoints.down(500.1)]: {
        left: "0px !important",
      },
    },
    navMenuItemContainer: {
      backgroundColor: "#282828",
      border: "1px solid #323232",
      overflow: "hidden",
      width: "100%",
      "&>:not(:last-child)": {
        marginBottom: 10,
      },
      [theme.breakpoints.down(1000.1)]: {
        "& > *": {
          fontSize: 18,
        },
      },
      [theme.breakpoints.down(600.1)]: {
        "& > *": {
          fontSize: 14,
        },
        "&>:not(:last-child)": {
          marginBottom: 5,
        },
      },
    },
    navMenuItem: {
      color: "#e5e5e5",
      "&:hover": {
        backgroundColor: "#3a3a3a",
      },
    },
    typeBtn: {
      textTransform: "capitalize",
      padding: "6px 12px",
      borderRadius: 500,
      transition: "all .2s",
    },
    activeTypeBtn: {
      backgroundColor: "#1cb050",
      border: "2px solid rgb(0 0 0 / 50%)",
      "&:hover": {
        backgroundColor: "#1aa149",
        border: "2px solid rgb(0 0 0 / 50%)",
      },
    },
    searchBtn: {
      minWidth: 30,
      maxWidth: 30,
      height: 30,
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    navUserOptionsBtn: {
      marginLeft: 10,
      [theme.breakpoints.down(700.1)]: {
        marginLeft: 0,
      },
      [theme.breakpoints.down(500.1)]: {
        "& > span": {
          "& > :last-child": {
            marginLeft: 0,
          },
        },
      },
    },
  };
});
const redirectUri = "https://music-app-liard.vercel.app";
// const redirectUri = "http://localhost:3000";
// console.log("updated");

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=e6719168da3047aaa2b0b9be996612f2&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const searchTypes = ["songs", "playlists", "artists", "albums"];

export default function Nav() {
  const classes = useStyles();
  const {
    userInfo,
    setSearchValue,
    searchValue,
    setSearchType,
    searchType,
    // setShowSearch,
    // showSearch,
  } = useAppContext();
  const router = useRouter();
  const path = router.pathname.replace("/", "");
  const [afterLoginMiddleNavLink, setAfterLoginMiddleNavLink] = useState([]);
  const activeTab = router.query.tab;
  const searchQuery = router.query.search;

  useEffect(() => {
    if (router.pathname === "/browse") {
      setAfterLoginMiddleNavLink([
        "genres",
        "new-releases",
        "feature-episodes",
      ]);
    } else if (router.pathname === "/library") {
      setAfterLoginMiddleNavLink(["playlists", "tracks", "albums"]);
    } else {
      setAfterLoginMiddleNavLink([]);
    }
  }, [router.pathname]);

  /**
   * clearing search value when path chages
   */
  useEffect(() => {
    setSearchValue("");
  }, [router.asPath]);

  const signout = () => {
    localStorage.clear();
    router.reload();
  };

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
  const navAfterLoginBtns = ["home", "browse", "library"];

  return (
    <nav id="nav" className={styles.nav}>
      {!userInfo ? (
        <div className={styles.navInnerContainer}>
          <div
            className={styles.navLogoContainer}
            onClick={() => router.push("/")}
          >
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
            <div
              className={styles.navLogoContainerAfterLogin}
              onClick={() => router.push("/home")}
            >
              <Image src={logo} alt="logo" />
            </div>
            {!searchQuery && searchValue.trim().length < 1 && (
              <div className={styles.navBtnContainerAfterLogin}>
                {navAfterLoginBtns.map((btn) => {
                  return (
                    <NextLink key={btn} href={`/${btn}`}>
                      <Link className={classes.afterLoginBtn}>
                        <Typography
                          variant="body1"
                          className={`${classes.afterLoginBtnText} ${
                            path.includes(btn) ? classes.colorfff : ""
                          }`}
                        >
                          {btn}
                        </Typography>
                      </Link>
                    </NextLink>
                  );
                })}
              </div>
            )}
          </span>

          {!searchQuery && searchValue.trim().length < 1 ? (
            afterLoginMiddleNavLink.length > 0 && (
              <div className={styles.afterLoginMiddleNavLinkContainer}>
                {afterLoginMiddleNavLink.map((link) => {
                  return (
                    <NextLink key={link} href={`?tab=${link}`}>
                      <Link className={classes.afterLoginMiddleNavLink}>
                        <Typography
                          variant="subtitle1"
                          className={classes.afterLoginMiddleNavLinkText}
                          color={
                            link === activeTab ? "primary" : "textSecondary"
                          }
                        >
                          {link.replace("-", " ")}
                        </Typography>
                        {activeTab === link && (
                          <span
                            className={
                              styles.afterLoginMiddleNavActiveLinkBottom
                            }
                          />
                        )}
                      </Link>
                    </NextLink>
                  );
                })}
              </div>
            )
          ) : (
            <div className={styles.searchTypeContainer}>
              {searchTypes.map((type) => {
                return (
                  <Button
                    key={type}
                    variant="outlined"
                    className={`${classes.typeBtn} ${
                      type === searchType ? classes.activeTypeBtn : ""
                    }`}
                    color="primary"
                    onClick={() => setSearchType(type)}
                  >
                    <Typography
                      variant="subtitle2"
                      color={`${
                        type === searchType ? "primary" : "textSecondary"
                      }`}
                    >
                      {type}
                    </Typography>
                  </Button>
                );
              })}
            </div>
          )}

          <span
            className={`${styles.displayFlex} ${
              searchQuery ? styles.searchInputContainer : ""
            } `}
          >
            <div
              style={{ display: searchQuery ? "flex" : "" }}
              className={styles.searchInput}
            >
              <Search />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className={styles.navInput}
              />
            </div>

            {!searchQuery && (
              <div className={styles.searchInputContainerSmallerScreen}>
                <NextLink href="?search=true">
                  <Button className={classes.searchBtn} disableElevation>
                    <Search />
                  </Button>
                </NextLink>
              </div>
            )}
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className={classes.navUserOptionsBtn}
              endIcon={
                !open ? (
                  <KeyboardArrowDown className={classes.colorfff} />
                ) : (
                  <KeyboardArrowUp className={classes.colorfff} />
                )
              }
              disableRipple
            >
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
                <div className={styles.navUserOptionsUserName}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    className={classes.userName}
                  >
                    {userInfo.name}
                  </Typography>
                  <Popper
                    open={open}
                    className={classes.navMenuContainer}
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
                              className={classes.navMenuItemContainer}
                            >
                              <MenuItem
                                onClick={() => {
                                  router.push("/library");
                                  setOpen(false);
                                }}
                                className={classes.navMenuItem}
                              >
                                Library
                              </MenuItem>
                              <MenuItem
                                onClick={signout}
                                className={classes.navMenuItem}
                              >
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </div>
            </Button>
          </span>
        </div>
      )}
    </nav>
  );
}

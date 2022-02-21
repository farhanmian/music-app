import React from "react";
import styles from "./PlaylistHeader.module.css";
import { PlaylistType } from "../../../store/types/types";
import { Button, makeStyles, Typography } from "@material-ui/core";
import Image from "next/image";
import HeartOutlined from "../../icons/HeartOutlined";
import ThreeDots from "../../icons/ThreeDots";
import Skeletons from "../Skeletons/Skeletons";
import { useAppContext } from "../../../store/context/appContext";

const useStyles = makeStyles({
  capitalize: {
    textTransform: "capitalize",
  },
  playlistDetailLabel: {
    marginTop: 3,
    marginBottom: 12,
    maxWidth: 530,
  },
  playlistDetailOptionBtn: {
    minWidth: 168,
    maxWidth: 168,
    height: 40,
    textTransform: "uppercase",
    borderRadius: 40,
    backgroundImage:
      "linear-gradient(to right, #35EDFB -47%, #2D9BEF 40%, #9B2DEF 129%)",
    marginRight: 20,
    transition: "all .3s",
    "&:hover": {
      boxShadow: "0 2px 5px #088dff52",
    },
    "&:active": {
      boxShadow: "0 0px 3px #088dff52",
    },
  },
  playlistDetailOptionBtnText: {
    fontWeight: "bold",
  },
  playlistDetailHeartBtn: {
    marginRight: 20,
  },
  playlistDetailBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    minWidth: 40,
    maxWidth: 40,
    height: 40,
    padding: 0,
  },
});

const PlaylistHeader: React.FC<{ playlist: PlaylistType }> = ({ playlist }) => {
  const classes = useStyles();
  const { trackUri, setTrackUri, setIsSongPlaying, isSongPlaying } =
    useAppContext();

  return (
    <React.Fragment>
      {playlist ? (
        <div className={styles.playlistDetailContainer}>
          <div className={styles.playlistDetailImage}>
            <Image
              loader={() => playlist.images.url}
              unoptimized
              width={225}
              height={225}
              src={playlist.images.url}
              alt="new-release-img"
            />
          </div>
          <div className={styles.playlistDetailTextContainer}>
            <Typography variant="subtitle1" color="primary">
              Playlist
            </Typography>
            <Typography
              variant="h2"
              color="primary"
              className={classes.capitalize}
            >
              {playlist.name}
            </Typography>

            <Typography
              variant="body2"
              color="primary"
              className={classes.playlistDetailLabel}
            >
              {playlist.label}
            </Typography>

            <Typography variant="caption" color="textSecondary">
              {`${playlist.totalTracks} ${
                playlist.totalTracks > 1 ? "Songs" : "Song"
              }`}
            </Typography>
          </div>

          <div className={styles.playlistDetailOptionsContainer}>
            <Button
              variant="contained"
              className={classes.playlistDetailOptionBtn}
              disableElevation
              onClick={() => {
                setTrackUri(playlist.uri);
                playlist.uri === trackUri &&
                  setIsSongPlaying((prevState) => !prevState);
              }}
            >
              <Typography
                variant="subtitle2"
                className={classes.playlistDetailOptionBtnText}
                color="primary"
              >
                {playlist.uri === trackUri
                  ? `${isSongPlaying ? "Pause" : "Play"}`
                  : "Play"}
              </Typography>
            </Button>

            <Button
              variant="outlined"
              color="primary"
              className={`${classes.playlistDetailBtn} ${classes.playlistDetailHeartBtn}`}
            >
              <HeartOutlined />
            </Button>

            <Button
              variant="outlined"
              color="primary"
              className={`${classes.playlistDetailBtn} ${classes.playlistDetailHeartBtn}`}
            >
              <ThreeDots />
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.skeletonContainer}>
          <Skeletons
            numberOfSkeleton={1}
            width1={1480}
            height1={235}
            width2={0}
            height2={0}
            borderRadius1={8}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default PlaylistHeader;

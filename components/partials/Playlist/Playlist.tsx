import {
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import React from "react";
import ThreeDots from "../../icons/ThreeDots";
import styles from "./Playlist.module.css";
import Image from "next/image";
import HeartOutlined from "../../icons/HeartOutlined";
import Add from "../../icons/Add";
import { PlaylistType, Tracks } from "../../../store/types/types";
import { useAppContext } from "../../../store/context/appContext";
import Search from "../../icons/Search";

const useStyles = makeStyles({
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
  capitalize: {
    textTransform: "capitalize",
  },
  fontSize15: {
    fontSize: 15,
  },
  artistName: {
    wordSpacing: 3,
  },
  textField: {
    width: 133,
  },
});

const Playlist: React.FC<{ playlist: PlaylistType; tracks: Tracks[] }> = ({
  playlist,
  tracks,
}) => {
  const classes = useStyles();
  const {
    setTrackUri,
    currentSongName,
    trackUri,
    setIsSongPlaying,
    isSongPlaying,
  } = useAppContext();

  return (
    <div className={styles.playlist}>
      {playlist && (
        <div className={styles.playlistInnerContainer}>
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
                  playlist.type === "show" ? "Episodes" : "Song"
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

          <div className={styles.playlistTracksContainer}>
            <div className={styles.playlistSearchContainer}>
              <TextField
                className={classes.textField}
                id="input-with-icon-textfield"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>

            <div className={styles.playlistTracksHeadingContainer}>
              <Typography variant="caption" color="textSecondary">
                # TITLE
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ARTIST
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ALBUM
              </Typography>
            </div>

            <div className={styles.playlistTracksInnerContainer}>
              {tracks.length > 0 &&
                tracks.map((track: Tracks, i) => {
                  const artistsName = `${
                    track.artists !== null && track.artists !== undefined
                      ? track.artists.length < 2
                        ? track.artists.map((item) => item.name)
                        : track.artists.map((item) => ` ${item?.name}`)
                      : playlist.artists && playlist.artists[0].name
                  }`;

                  return (
                    track.name && (
                      <div
                        key={i}
                        className={`${styles.playlistTrack} ${
                          currentSongName === track.name
                            ? styles.activePlaylistTrack
                            : ""
                        }`}
                        onClick={() => setTrackUri(track.uri)}
                      >
                        <div className={styles.playlistNameNImage}>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            className={classes.fontSize15}
                          >
                            {i + 1}
                          </Typography>

                          <Typography
                            variant="caption"
                            className={classes.fontSize15}
                            color="primary"
                          >
                            {track.name.trim().length > 35
                              ? `${track.name.slice(0, 35)}...`
                              : track.name}
                          </Typography>
                        </div>

                        <Typography
                          variant="caption"
                          color="primary"
                          className={`${classes.artistName} ${classes.fontSize15}`}
                        >
                          {artistsName.trim().length > 30
                            ? `${artistsName.slice(0, 35)}...`
                            : artistsName}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="primary"
                          className={classes.fontSize15}
                        >
                          {/* album */}
                          {playlist.name}
                        </Typography>

                        <div className={styles.playlistOptionsContainer}>
                          <span className={styles.addToFav}>
                            <HeartOutlined />
                          </span>
                          <span className={styles.addToPlaylist}>
                            <Add />
                          </span>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          backgroundImage:
            playlist &&
            `linear-gradient( to right bottom, rgba(42, 13, 25, 0.5), rgba(29, 9, 44, 0.718) ), url(${playlist.images.url})`,
        }}
        className={styles.playlistBackground}
      />
    </div>
  );
};

export default Playlist;

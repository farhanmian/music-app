import { Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import ThreeDots from "../../icons/ThreeDots";
import styles from "./Playlist.module.css";
import Image from "next/image";
import HeartOutlined from "../../icons/HeartOutlined";
import Add from "../../icons/Add";
import { PlaylistType, Tracks } from "../../../store/types/types";

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
      "linear-gradient(#35EDFB 30% , #2D9BEF 110%, #9B2DEF -10%)",
    marginRight: 20,
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
});

const Playlist: React.FC<{ playlist: PlaylistType; tracks: Tracks[] }> = ({
  playlist,
  tracks,
}) => {
  const classes = useStyles();

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
              >
                Play/Pause
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
                  return (
                    <div key={track.id} className={styles.playlistTrack}>
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
                        {track.artists !== null
                          ? track.artists.length < 2
                            ? track.artists.map((item) => item.name)
                            : track.artists.map((item) => `${item.name}, `)
                          : playlist.artists[0].name}
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
            `linear-gradient(to right bottom, rgba(92, 28, 54, 0.35), rgba(44, 9, 71, 0.356)), url(${playlist.images.url})`,
        }}
        className={styles.playlistBackground}
      />
    </div>
  );
};

export default Playlist;

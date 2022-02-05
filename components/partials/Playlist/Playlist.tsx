import { Typography, makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ThreeDots from "../../icons/ThreeDots";
import styles from "./Playlist.module.css";
import Image from "next/image";
import { useAppContext } from "../../../store/context/appContext";
import HeartOutlined from "../../icons/HeartOutlined";
import Add from "../../icons/Add";

const useStyles = makeStyles({
  playlistDetailLabel: {
    marginTop: 3,
    marginBottom: 12,
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
});

export default function Playlist({ id }) {
  const classes = useStyles();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx || !id) return;

    spotifyApiCtx.getAlbum(id).then((res) => {
      console.log(res);
      setPlaylist({
        name: res.body.name,
        label: res.body.label,
        type: res.body.type,
        images: { url: res.body.images[1].url },
        artist: {
          name: res.body.artists[0].name,
          id: res.body.artists[0].id,
        },
        totalTracks: res.body.total_tracks,
      });
    });
  }, [accessToken, spotifyApiCtx]);

  return (
    <section className={styles.playlist}>
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
                {playlist.totalTracks > 1
                  ? `${playlist.totalTracks} Songs`
                  : `${playlist.totalTracks} Song`}
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
              <div className={styles.playlistTrack}>
                <div className={styles.playlistNameNImage}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={classes.fontSize15}
                  >
                    1
                  </Typography>

                  <div className={styles.playlistImage}>
                    <Image
                      loader={() =>
                        "https://i.scdn.co/image/ab67616d00004851a33a67d46c31e949dce60810"
                      }
                      unoptimized
                      width={35}
                      height={35}
                      src="https://i.scdn.co/image/ab67616d00004851a33a67d46c31e949dce60810"
                      alt="new-release-img"
                    />
                  </div>
                  <Typography
                    variant="caption"
                    className={classes.fontSize15}
                    color="primary"
                  >
                    Track Name
                  </Typography>
                </div>

                <Typography
                  variant="caption"
                  color="primary"
                  className={classes.fontSize15}
                >
                  Artist
                </Typography>

                <Typography
                  variant="caption"
                  color="primary"
                  className={classes.fontSize15}
                >
                  Album
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
    </section>
  );
}

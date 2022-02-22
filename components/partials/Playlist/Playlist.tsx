import {
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardActionArea,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ThreeDots from "../../icons/ThreeDots";
import styles from "./Playlist.module.css";
import Image from "next/image";
import HeartOutlined from "../../icons/HeartOutlined";
import {
  PlaylistType,
  Tracks,
  UserDataContainer,
} from "../../../store/types/types";
import { useAppContext } from "../../../store/context/appContext";
import Search from "../../icons/Search";
import Skeletons from "../Skeletons/Skeletons";
import { Favorite } from "@mui/icons-material";
import { useRouter } from "next/dist/client/router";

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
    width: 140,
    "& > div": {
      paddingBottom: 5.6,
    },
    "& > div::before": {
      borderColor: "#9d9999",
      borderWidth: 2,
    },
    "& > div input": {
      fontSize: 16,
      color: "#fff",
    },
  },
  playlistTrackCard: {
    background: "transparent",
    boxShadow: "none",
    color: "rgba(225,225,225, .4)",
  },
  favoriteIcon: {
    color: "#1ED760",
  },
});

const Playlist: React.FC<{ playlist: PlaylistType; tracks: Tracks[] }> = ({
  playlist,
  tracks,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    setTrackUri,
    currentSongName,
    trackUri,
    setIsSongPlaying,
    isSongPlaying,
    userData,
    setUserData,
    spotifyApiCtx,
    accessToken,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");
  const [trackData, setTrackData] = useState([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setTrackData(tracks);
  }, [tracks]);

  useEffect(() => {
    if (searchValue.trim().length === 0) {
      setTrackData(tracks);
      return;
    }

    const timeoutId = setTimeout(() => {
      const transformedData = tracks.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTrackData(transformedData);
    }, 1000);

    () => clearTimeout(timeoutId);
  }, [searchValue]);

  const playSongHandler = (uri: string) => {
    if (hover) return;
    setTrackUri(uri);
  };

  const addToFavoriteHandler = (id: string) => {
    if (!spotifyApiCtx || !accessToken) return;
    spotifyApiCtx.addToMySavedTracks([id]);
    const data: UserDataContainer = userData;
    data.tracks.push(id);
    setUserData(data);
  };
  const removeFavoriteHandler = (id: string) => {
    spotifyApiCtx.removeFromMySavedTracks([id]);
    const data: UserDataContainer = userData;
    data.tracks = data.tracks.filter((item) => item !== id);
    setUserData(data);
  };

  return (
    <div className={styles.playlist}>
      <div className={styles.playlistInnerContainer}>
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

        <div className={styles.playlistTracksContainer}>
          <div className={styles.playlistSearchContainer}>
            <TextField
              onChange={(e) => setSearchValue(e.target.value)}
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
              <span className={styles.playlistTracksHeadingTitleHash}>#</span>
              TITLE
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ARTIST
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ALBUM
            </Typography>
          </div>

          <div
            className={styles.playlistTracksInnerContainer}
            style={{ overflowY: trackData.length > 10 ? "scroll" : "hidden" }}
          >
            {trackData.length > 0 ? (
              trackData.map((track: Tracks, i) => {
                const artistDetail = track.artists.map((item) => {
                  return {
                    name: item.name,
                    id: item.id,
                  };
                });

                return (
                  track.name && (
                    <Card key={i} className={classes.playlistTrackCard}>
                      <CardActionArea>
                        <div
                          className={`${styles.playlistTrack} ${
                            currentSongName === track.name
                              ? styles.activePlaylistTrack
                              : ""
                          }`}
                          onClick={() => playSongHandler(track.uri)}
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

                          <div className={styles.artistNameContainer}>
                            {artistDetail.map((item) => {
                              return (
                                <Link
                                  key={item.id}
                                  onMouseEnter={() => setHover(true)}
                                  onMouseLeave={() => setHover(false)}
                                  onClick={() =>
                                    router.push(`/artist/${item.id}`)
                                  }
                                >
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    className={`${classes.artistName} ${classes.fontSize15}`}
                                  >
                                    {item.name}
                                  </Typography>
                                </Link>
                              );
                            })}
                          </div>

                          <Typography
                            variant="caption"
                            color="primary"
                            className={classes.fontSize15}
                          >
                            {/* album */}
                            {track.albumName ? track.albumName : playlist.name}
                          </Typography>

                          <div
                            className={styles.playlistOptionsContainer}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                          >
                            {userData.tracks.includes(track.id) ? (
                              <span
                                onClick={() => removeFavoriteHandler(track.id)}
                              >
                                <Favorite className={classes.favoriteIcon} />
                              </span>
                            ) : (
                              <span
                                onClick={() => addToFavoriteHandler(track.id)}
                              >
                                <HeartOutlined />
                              </span>
                            )}
                          </div>
                        </div>
                      </CardActionArea>
                    </Card>
                  )
                );
              })
            ) : (
              <Skeletons
                numberOfSkeleton={6}
                width1={1460}
                height1={60}
                width2={0}
                height2={0}
                borderRadius1={4}
              />
            )}
          </div>
        </div>
      </div>

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

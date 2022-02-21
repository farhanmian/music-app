import React, { useState } from "react";
import styles from "./PlaylistTracks.module.css";
import {
  Card,
  CardActionArea,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  PlaylistType,
  Tracks,
  UserDataContainer,
} from "../../../store/types/types";
import { useAppContext } from "../../../store/context/appContext";
import { Favorite } from "@mui/icons-material";
import HeartOutlined from "../../icons/HeartOutlined";
import Skeletons from "../Skeletons/Skeletons";
import Add from "../../icons/Add";

const useStyles = makeStyles({
  fontSize15: {
    fontSize: 15,
  },
  artistName: {
    wordSpacing: 3,
  },
  playlistTrackCard: {
    background: "transparent",
    boxShadow: "none",
    color: "rgba(225,225,225, .4)",
    // color: "rgb(122 122 122 / 43%)",
    // color: "rgb(141 140 140 / 51%)",
  },
  favoriteIcon: {
    color: "#1ED760",
  },
});

const PlaylistTracks: React.FC<{
  trackData: Tracks[];
  playlist: PlaylistType;
}> = ({ trackData, playlist }) => {
  const classes = useStyles();
  const {
    currentSongName,
    spotifyApiCtx,
    accessToken,
    setUserData,
    userData,
    setTrackUri,
  } = useAppContext();

  const [hover, setHover] = useState(false);
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
    <React.Fragment>
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
            const artistsName = `${
              track.artists !== null && track.artists !== undefined
                ? track.artists.length < 2
                  ? track.artists.map((item) => item.name)
                  : track.artists.map((item) => ` ${item?.name}`)
                : playlist.artists && playlist.artists[0].name
            }`;

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
                        {playlist && playlist.name}
                      </Typography>

                      <div
                        className={styles.playlistOptionsContainer}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        {userData.tracks.includes(track.id) ? (
                          <span onClick={() => removeFavoriteHandler(track.id)}>
                            <Favorite className={classes.favoriteIcon} />
                          </span>
                        ) : (
                          <span onClick={() => addToFavoriteHandler(track.id)}>
                            <HeartOutlined />
                          </span>
                        )}

                        <span className={styles.addToPlaylist}>
                          <Add />
                        </span>
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
    </React.Fragment>
  );
};

export default PlaylistTracks;

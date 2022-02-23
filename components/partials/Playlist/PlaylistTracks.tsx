import React, { useEffect, useState } from "react";
import styles from "./PlaylistTracks.module.css";
import {
  Typography,
  Card,
  CardActionArea,
  Link,
  makeStyles,
} from "@material-ui/core";
import { Favorite } from "@mui/icons-material";
import HeartOutlined from "../../icons/HeartOutlined";
import { Tracks } from "../../../store/types/types";
import { useAppContext } from "../../../store/context/appContext";
import { useRouter } from "next/dist/client/router";
import Skeletons from "../Skeletons/Skeletons";

const useStyles = makeStyles({
  artistName: {
    wordSpacing: 3,
  },
  fontSize15: {
    fontSize: 15,
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

const PlaylistTracks: React.FC<{
  trackData: Tracks[];
  playlistName: string;
}> = ({ trackData, playlistName }) => {
  const classes = useStyles();
  const router = useRouter();
  const { setTrackUri, currentSongName, spotifyApiCtx, accessToken } =
    useAppContext();
  const [hover, setHover] = useState(false);
  const [favSongs, setFavSongs] = useState([]);

  /**
   * fetching user saved tracks
   */
  useEffect(() => {
    if (!spotifyApiCtx || !accessToken) return;
    spotifyApiCtx.getMySavedTracks().then((res) => {
      const transformedData: string[] = [];
      res.body.items.map((item) => {
        transformedData.push(item.track.id);
      });
      setFavSongs(transformedData);
    });
  }, [accessToken, spotifyApiCtx]);

  const addToFavoriteHandler = (id: string) => {
    if (!spotifyApiCtx || !accessToken) return;
    spotifyApiCtx.addToMySavedTracks([id]);

    setFavSongs((prevId) => (prevId ? [...prevId, id] : [id]));
  };
  const removeFavoriteHandler = (id: string) => {
    spotifyApiCtx.removeFromMySavedTracks([id]);
    const data = favSongs.filter((item) => item !== id);
    setFavSongs(data);
  };

  const playSongHandler = (uri: string) => {
    if (hover) return;
    setTrackUri(uri);
  };

  return (
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
                            onClick={() => router.push(`/artist/${item.id}`)}
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
                      {track.albumName ? track.albumName : playlistName}
                    </Typography>

                    <div
                      className={styles.playlistOptionsContainer}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      {favSongs.includes(track.id) ? (
                        <span onClick={() => removeFavoriteHandler(track.id)}>
                          <Favorite className={classes.favoriteIcon} />
                        </span>
                      ) : (
                        <span onClick={() => addToFavoriteHandler(track.id)}>
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
  );
};

export default PlaylistTracks;

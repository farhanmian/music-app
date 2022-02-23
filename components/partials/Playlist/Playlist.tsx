import {
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ThreeDots from "../../icons/ThreeDots";
import styles from "./Playlist.module.css";
import Image from "next/image";
import HeartOutlined from "../../icons/HeartOutlined";
import { PlaylistType, Tracks } from "../../../store/types/types";
import { useAppContext } from "../../../store/context/appContext";
import Search from "../../icons/Search";
import Skeletons from "../Skeletons/Skeletons";
import { Favorite } from "@mui/icons-material";
import { useRouter } from "next/dist/client/router";
import PlaylistTracks from "./PlaylistTracks";

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
    trackUri,
    setIsSongPlaying,
    isSongPlaying,
    spotifyApiCtx,
    accessToken,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");
  const [trackData, setTrackData] = useState<Tracks[]>([]);
  const [favAlbums, setFavAlbums] = useState([]);

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

  const addAlbumToFavoriteHandler = (id: string) => {
    spotifyApiCtx.addToMySavedAlbums([id]);
    setFavAlbums((prevData) => (prevData ? [...prevData, id] : [id]));
  };

  const removeAlbumFromFavoriteHandler = (id: string) => {
    spotifyApiCtx.removeFromMySavedAlbums([id]);
    const data = favAlbums.filter((item) => item !== id);
    setFavAlbums(data);
  };

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;
    spotifyApiCtx.getMySavedAlbums().then((res) => {
      const transformedData: string[] = [];
      res.body.items.map((item) => {
        transformedData.push(item.album.id);
      });
      setFavAlbums(transformedData);
    });
  }, [accessToken, spotifyApiCtx]);

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

              {router.asPath.includes("album") &&
                (playlist && favAlbums.includes(playlist.id) ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={`${classes.playlistDetailBtn} ${classes.playlistDetailHeartBtn}`}
                    onClick={() => removeAlbumFromFavoriteHandler(playlist.id)}
                    style={{ borderColor: "#1ED760" }}
                  >
                    <Favorite className={classes.favoriteIcon} />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={`${classes.playlistDetailBtn} ${classes.playlistDetailHeartBtn}`}
                    onClick={() => addAlbumToFavoriteHandler(playlist.id)}
                  >
                    <HeartOutlined />
                  </Button>
                ))}

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

          <PlaylistTracks
            trackData={trackData}
            playlistName={playlist && playlist.name}
          />
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

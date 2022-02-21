import { makeStyles, TextField, InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./Playlist.module.css";
import { PlaylistType, Tracks } from "../../../store/types/types";
import Search from "../../icons/Search";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

const useStyles = makeStyles({
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
});

const Playlist: React.FC<{ playlist: PlaylistType; tracks: Tracks[] }> = ({
  playlist,
  tracks,
}) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const [trackData, setTrackData] = useState([]);

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

  return (
    <div className={styles.playlist}>
      <div className={styles.playlistInnerContainer}>
        <PlaylistHeader playlist={playlist} />

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

          <PlaylistTracks playlist={playlist} trackData={trackData} />
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

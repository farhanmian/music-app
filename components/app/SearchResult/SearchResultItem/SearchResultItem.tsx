import React, { useState } from "react";
import styles from "./SearchResultItem.module.css";
import Image from "next/image";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { useAppContext } from "../../../../store/context/appContext";
import { SearchTrackType } from "../../../../store/types/types";
import PlayPauseBtn from "../../../partials/PlayPauseBtn/PlayPauseBtn";

const useStyles = makeStyles({
  margin5: {
    marginBottom: 5,
  },
  capitalize: {
    textTransform: "capitalize",
  },
  searchResultItemCard: {
    backgroundColor: "rgba(42, 42, 42, 0.3)",
    color: "#fff",
    boxShadow: "none",
  },
});

const SearchResultItem: React.FC<{ track: SearchTrackType }> = ({ track }) => {
  const classes = useStyles();
  const { setTrackUri, trackUri } = useAppContext();
  const [hover, setHover] = useState(false);

  const artistName = `${
    track.artists.length === 1
      ? track.artists.map((item: { name: string }) => item.name)
      : track.artists.map((item: { name: string }) => `${item.name} `)
  }`;

  const playSongHandler = () => {
    if (hover) return;
    setTrackUri(track.uri);
  };

  return (
    <Card className={classes.searchResultItemCard}>
      <CardActionArea>
        <div
          key={track.id}
          className={styles.trackItem}
          onClick={playSongHandler}
        >
          <div className={styles.trackImage}>
            <Image
              loader={() => track.image.url}
              unoptimized
              width={225}
              height={225}
              src={track.image.url}
              alt="new-release-img"
            />

            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`${"playPauseIcon"} ${styles.playPauseIcon} ${
                trackUri === track.uri ? "activePlayPauseIcon" : ""
              }`}
            >
              <PlayPauseBtn itemUri={track.uri} />
            </div>
          </div>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.margin5}
          >
            {track.name.trim().length > 20
              ? `${track.name.slice(0, 20)}...`
              : track.name}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.capitalize}
          >
            {artistName.trim().length > 27
              ? `${artistName.slice(0, 27)}...`
              : artistName}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default SearchResultItem;

import React from "react";
import styles from "./SearchResultItem.module.css";
import Image from "next/image";
import { Typography, makeStyles } from "@material-ui/core";
import { useAppContext } from "../../../../store/context/appContext";
import { SearchTrackType } from "../../../../store/types/types";

const useStyles = makeStyles({
  margin5: {
    marginBottom: 5,
  },
  capitalize: {
    textTransform: "capitalize",
  },
});

const SearchResultItem: React.FC<{ track: SearchTrackType }> = ({ track }) => {
  const classes = useStyles();
  const { setTrackUri } = useAppContext();
  return (
    <div
      key={track.id}
      className={styles.trackItem}
      onClick={() => setTrackUri(track.uri)}
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
        {track.artists.length === 1
          ? track.artists.map((item: { name: string }) => item.name)
          : track.artists.map((item: { name: string }) => `${item.name}, `)}
      </Typography>
    </div>
  );
};

export default SearchResultItem;

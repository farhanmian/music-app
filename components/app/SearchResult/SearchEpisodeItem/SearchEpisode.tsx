import React from "react";
import styles from "./SearchEpisode.module.css";
import Image from "next/image";
import { Typography, makeStyles } from "@material-ui/core";
import { SearchEpisodeItemType } from "../../../../store/types/types";

const useStyles = makeStyles({
  margin5: {
    marginBottom: 5,
  },
});

const SearchEpisode: React.FC<{ episode: SearchEpisodeItemType }> = ({
  episode,
}) => {
  const classes = useStyles();
  return (
    <div key={episode.id} className={styles.episodeItem}>
      <div className={styles.episodeImage}>
        <Image
          loader={() => episode.images.url}
          unoptimized
          width={225}
          height={225}
          src={episode.images.url}
          alt="new-release-img"
        />
      </div>
      <Typography
        variant="subtitle2"
        color="primary"
        className={classes.margin5}
      >
        {episode.name.trim().length > 20
          ? `${episode.name.slice(0, 20)}...`
          : episode.name}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {`${episode.duration.toFixed(2)} min`}
      </Typography>
    </div>
  );
};

export default SearchEpisode;

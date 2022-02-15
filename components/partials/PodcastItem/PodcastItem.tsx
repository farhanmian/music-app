import React from "react";
import styles from "./PodcastItem.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import NextLink from "next/link";
import { PodCastItemType } from "../../../store/types/types";

const useStyles = makeStyles({
  podcastItemName: {
    marginBottom: 5,
    textTransform: "capitalize",
  },
});

const PodcastItem: React.FC<{ podcast: PodCastItemType }> = ({ podcast }) => {
  const classes = useStyles();
  return (
    <NextLink href={`podcast/${podcast.id}`}>
      <div className={styles.podcastItem}>
        <div className={styles.podcastItemImage}>
          <Image
            loader={() => podcast.images.url}
            unoptimized
            width={225}
            height={225}
            src={podcast.images.url}
            alt="new-release-img"
          />
        </div>

        <Typography
          variant="body2"
          className={classes.podcastItemName}
          color="primary"
        >
          {podcast.name.trim().length > 24
            ? `${podcast.name.slice(0, 24)}...`
            : podcast.name}
        </Typography>

        <Typography variant="caption" color="textSecondary">
          {podcast.publisher.trim().length > 30
            ? `${podcast.publisher.slice(0, 30)}...`
            : podcast.publisher}
        </Typography>
      </div>
    </NextLink>
  );
};

export default PodcastItem;

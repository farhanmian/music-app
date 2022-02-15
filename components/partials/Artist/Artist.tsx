import React from "react";
import Image from "next/image";
import styles from "./Artist.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import Heart from "../../icons/Heart";
import { ArtistType } from "../../../store/types/types";

const useStyles = makeStyles({
  artistName: {
    marginBottom: 10,
  },
});

const Artist: React.FC<{ artist: ArtistType }> = ({ artist }) => {
  const classes = useStyles();

  return (
    <div className={styles.artistItem}>
      <div className={styles.artistImage}>
        <Image
          loader={() => artist.images.url}
          unoptimized
          width={225}
          height={225}
          src={artist.images.url}
          alt="-img"
        />
      </div>
      <Typography
        variant="subtitle2"
        color="primary"
        className={`${classes.artistName} ${styles.artistName}`}
      >
        {artist.name}
      </Typography>

      <span className={styles.itemLikesContainer}>
        <Heart />
        <Typography variant="caption" color="textSecondary">
          {artist.popularity}%
        </Typography>
      </span>
    </div>
  );
};

export default Artist;

import React from "react";
import Image from "next/image";
import styles from "./Artist.module.css";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import Heart from "../../../icons/Heart";
import { ArtistType } from "../../../../store/types/types";
import NextLink from "next/link";

const useStyles = makeStyles({
  artistName: {
    marginBottom: 10,
  },
  artistItemCard: {
    maxWidth: "max-content",
    backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "none",
  },
});

const Artist: React.FC<{ artist: ArtistType }> = ({ artist }) => {
  const classes = useStyles();

  return (
    <NextLink href={`/artist/${artist.id}`}>
      <Card className={classes.artistItemCard}>
        <CardActionArea style={{ top: 0 }}>
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
        </CardActionArea>
      </Card>
    </NextLink>
  );
};

export default Artist;

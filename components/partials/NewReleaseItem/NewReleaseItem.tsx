import React from "react";
import styles from "./NewReleaseItem.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import { NewReleaseItemType } from "../../../store/types/types";
import Image from "next/image";
import NextLink from "next/link";

const useStyles = makeStyles({
  margin5: {
    marginBottom: 5,
  },
  capitalize: {
    textTransform: "capitalize",
  },
});

const NewReleaseItem: React.FC<{ newRelease: NewReleaseItemType }> = ({
  newRelease,
}) => {
  const classes = useStyles();

  return (
    <NextLink href={`/browse/newReleases-album-${newRelease.id}`}>
      <div key={newRelease.id} className={styles.newReleaseItem}>
        <div className={styles.newReleaseImage}>
          <Image
            loader={() => newRelease.image.url}
            unoptimized
            width={225}
            height={225}
            src={newRelease.image.url}
            alt="new-release-img"
          />
        </div>
        <Typography
          variant="subtitle2"
          color="primary"
          className={classes.margin5}
        >
          {newRelease.name.trim().length > 24
            ? `${newRelease.name.slice(0, 24)}...`
            : newRelease.name}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.capitalize}
        >
          {newRelease.artists.name}
        </Typography>
      </div>
    </NextLink>
  );
};

export default NewReleaseItem;

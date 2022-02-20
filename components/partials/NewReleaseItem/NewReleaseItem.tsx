import React from "react";
import styles from "./NewReleaseItem.module.css";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
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
  newReleaseItemCard: {
    maxWidth: "max-content",
    backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "none",
    "& > button": {
      transition: "all .3s",
      "&:hover": {
        transform: "scale(.97)",
      },
    },
  },
});

const NewReleaseItem: React.FC<{ newRelease: NewReleaseItemType }> = ({
  newRelease,
}) => {
  const classes = useStyles();

  const artistName = `${
    newRelease.artists.length === 1
      ? newRelease.artists.map((item) => item.name)
      : newRelease.artists.map((item) => `${item.name} `)
  }`;

  return (
    <NextLink href={`album/${newRelease.id}`}>
      <Card className={classes.newReleaseItemCard}>
        <CardActionArea style={{ top: 0 }}>
          <div
            id={newRelease.type}
            key={newRelease.id}
            className={styles.newReleaseItem}
          >
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
              {newRelease.name.trim().length > 25
                ? `${newRelease.name.slice(0, 25)}...`
                : newRelease.name}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.capitalize}
            >
              {artistName.trim().length > 30
                ? `${artistName.slice(0, 30)}...`
                : artistName}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </NextLink>
  );
};

export default NewReleaseItem;

import React, { useState } from "react";
import styles from "./NewReleaseItem.module.css";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { NewReleaseItemType } from "../../../store/types/types";
import Image from "next/image";
import PlayPauseBtn from "../PlayPauseBtn/PlayPauseBtn";
import { useAppContext } from "../../../store/context/appContext";
import { useRouter } from "next/dist/client/router";

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
  const { trackUri } = useAppContext();
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const artistName = `${
    newRelease.artists.length === 1
      ? newRelease.artists.map((item) => item.name)
      : newRelease.artists.map((item) => `${item.name} `)
  }`;

  const openAlbumHandler = () => {
    if (hover) return;

    router.push(`/album/${newRelease.id}`);
  };

  return (
    <Card className={classes.newReleaseItemCard} onClick={openAlbumHandler}>
      <div
        id={newRelease.type}
        key={newRelease.id}
        className={styles.newReleaseItem}
      >
        <CardActionArea style={{ top: 0, marginBottom: 9, borderRadius: 8 }}>
          <div className={styles.newReleaseImage}>
            <Image
              loader={() => newRelease.image.url}
              unoptimized
              width={225}
              height={225}
              src={newRelease.image.url}
              alt="new-release-img"
            />

            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`${"playPauseIcon"} ${styles.playPauseIcon} ${
                trackUri === newRelease.uri ? "activePlayPauseIcon" : ""
              }`}
            >
              <PlayPauseBtn itemUri={newRelease.uri} />
            </div>
          </div>
        </CardActionArea>
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
    </Card>
  );
};

export default NewReleaseItem;

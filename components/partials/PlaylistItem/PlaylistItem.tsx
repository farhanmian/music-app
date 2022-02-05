import React from "react";
import styles from "./PlaylistItem.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import { CategoryPlaylist } from "../../../store/types/types";

const useStyles = makeStyles({
  playlistName: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});

const PlaylistItem: React.FC<{ playlist: CategoryPlaylist }> = ({
  playlist,
}) => {
  const classes = useStyles();
  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistItemImage}>
        <Image
          loader={() => playlist.images.url}
          unoptimized
          width={225}
          height={225}
          src={playlist.images.url}
          alt="new-release-img"
        />
      </div>

      <Typography
        variant="subtitle1"
        color="primary"
        className={classes.playlistName}
      >
        {playlist.name.trim().length > 24
          ? `${playlist.name.slice(0, 24)}...`
          : playlist.name}
      </Typography>
    </div>
  );
};

export default PlaylistItem;

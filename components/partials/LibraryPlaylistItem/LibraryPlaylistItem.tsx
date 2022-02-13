import React from "react";
import styles from "./LibraryPlaylistItem.module.css";
import { makeStyles, Typography } from "@material-ui/core";
import { LibraryPlaylistType } from "../../../store/types/types";
import Image from "next/image";
import NextLink from "next/link";

const useStyles = makeStyles({
  playlistName: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

const LibraryPlaylistItem: React.FC<{
  playlist: LibraryPlaylistType;
  link: string;
}> = ({ playlist, link }) => {
  const classes = useStyles();
  return (
    <NextLink href={link}>
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
          variant="subtitle2"
          color="primary"
          className={classes.playlistName}
        >
          {playlist.name.trim().length > 24
            ? `${playlist.name.slice(0, 24)}...`
            : playlist.name}
        </Typography>

        <Typography variant="caption" color="textSecondary">
          {playlist.noOfSongs} {playlist.type === "show" ? "Episodes" : "Songs"}
        </Typography>
      </div>
    </NextLink>
  );
};

export default LibraryPlaylistItem;

import React from "react";
import styles from "./PlaylistItem.module.css";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import Image from "next/image";
import NextLink from "next/link";
import { CategoryPlaylist } from "../../../store/types/types";

const useStyles = makeStyles({
  playlistName: {
    textTransform: "capitalize",
    fontWeight: 400,
    lineHeight: "20px",
  },
  playlistItemCard: {
    background: "transparent",
    color: "#fff",
    boxShadow: "none",
    transition: "all .3s",
    "&:hover": {
      transform: "scale(.97)",
    },
  },
});

const PlaylistItem: React.FC<{ playlist: CategoryPlaylist; link: string }> = ({
  playlist,
  link,
}) => {
  const classes = useStyles();
  return (
    <NextLink href={link}>
      <Card className={classes.playlistItemCard}>
        <CardActionArea>
          <div id={playlist.type} className={styles.playlistItem}>
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
        </CardActionArea>
      </Card>
    </NextLink>
  );
};

export default PlaylistItem;

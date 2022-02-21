import React, { useState } from "react";
import styles from "./PlaylistItem.module.css";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import Image from "next/image";
import { CategoryPlaylist } from "../../../store/types/types";
import PlayPauseBtn from "../PlayPauseBtn/PlayPauseBtn";
import { useAppContext } from "../../../store/context/appContext";
import { useRouter } from "next/dist/client/router";

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
  const router = useRouter();
  const { trackUri } = useAppContext();
  const [hover, setHover] = useState(false);

  const openPlaylistHandler = () => {
    if (hover) return;
    router.push(link);
  };

  return (
    <Card className={classes.playlistItemCard} onClick={openPlaylistHandler}>
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
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`${"playPauseIcon"} ${styles.playPauseIcon} ${
                trackUri === playlist.uri ? "activePlayPauseIcon" : ""
              }`}
            >
              <PlayPauseBtn itemUri={playlist.uri} />
            </div>
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
  );
};

export default PlaylistItem;

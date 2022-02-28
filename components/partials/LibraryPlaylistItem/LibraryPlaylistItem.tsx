import React, { useState } from "react";
import styles from "./LibraryPlaylistItem.module.css";
import {
  makeStyles,
  Typography,
  Card,
  CardActionArea,
  ClickAwayListener,
} from "@material-ui/core";
import { LibraryPlaylistType } from "../../../store/types/types";
import Image from "next/image";
import { useAppContext } from "../../../store/context/appContext";
import { useRouter } from "next/dist/client/router";
import PlayPauseBtn from "../PlayPauseBtn/PlayPauseBtn";
import RightClickOptions from "../RightClickOptions/RightClickOptions";

const useStyles = makeStyles({
  playlistName: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
  },
  playlistItemCard: {
    backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "none",
    position: "relative",
  },
});

const LibraryPlaylistItem: React.FC<{
  playlist: LibraryPlaylistType;
  link: string;
}> = ({ playlist, link }) => {
  const classes = useStyles();
  const router = useRouter();
  const { trackUri, isSongPlaying } = useAppContext();
  const [hover, setHover] = useState(false);
  const [showRightClickOption, setShowRightClickOption] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(null);

  const clickHandler = () => {
    if (hover || showRightClickOption) return;

    router.push(link);
  };

  const rightClickHandler = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setShowRightClickOption(true);
    setActiveTrackId(id);
  };

  const RightClick = () => {
    return (
      <RightClickOptions
        options={[
          trackUri === playlist.uri
            ? isSongPlaying
              ? "pause"
              : "play"
            : "play",
          "open",
          "remove from favorite",
        ]}
        id={playlist.id}
        uri={playlist.uri}
        type={playlist.type}
        artists={null}
      />
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setShowRightClickOption(false)}>
      <Card
        className={classes.playlistItemCard}
        onClick={clickHandler}
        onContextMenu={(e) => rightClickHandler(e, playlist.id)}
      >
        {playlist.type === "album" &&
          showRightClickOption &&
          activeTrackId === playlist.id && <RightClick />}

        <CardActionArea>
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
              variant="subtitle2"
              color="primary"
              className={classes.playlistName}
            >
              {playlist.name.trim().length > 24
                ? `${playlist.name.slice(0, 24)}...`
                : playlist.name}
            </Typography>

            <Typography variant="caption" color="textSecondary">
              {playlist.noOfSongs}{" "}
              {playlist.type === "show" ? "Episodes" : "Songs"}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </ClickAwayListener>
  );
};

export default LibraryPlaylistItem;

import React, { useState } from "react";
import styles from "./SavedTracks.module.css";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  ClickAwayListener,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import { TrackType } from "../../../../store/types/types";
import Image from "next/image";
import { useAppContext } from "../../../../store/context/appContext";
import Skeletons from "../../../partials/Skeletons/Skeletons";
import PlayPauseBtn from "../../../partials/PlayPauseBtn/PlayPauseBtn";
import RightClickOptions from "../../../partials/RightClickOptions/RightClickOptions";

const useStyles = makeStyles({
  userTrackContainer: {
    marginTop: 30,
  },
  heading: {
    textTransform: "capitalize",
  },
  playlistName: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
  },
  trackItemCard: {
    backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "none",
    position: "relative",
  },
});

const SavedTracks: React.FC<{
  data: TrackType[];
}> = ({ data }) => {
  const classes = useStyles();
  const { setTrackUri, trackUri, isSongPlaying } = useAppContext();
  const [showRightClickOption, setShowRightClickOption] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(null);

  const rightClickHandler = (e: React.MouseEvent, id) => {
    e.preventDefault();
    setShowRightClickOption(true);
    setActiveTrackId(id);
  };

  return (
    <div className={styles.innerContainer}>
      <Typography variant="h6" color="primary" className={classes.heading}>
        My Tracks
      </Typography>

      <Grid
        container
        columnGap="26px"
        rowGap="48px"
        className={classes.userTrackContainer}
      >
        {data.length > 0 ? (
          data.map((track: TrackType) => {
            const artistName = `${
              track.artists.length === 1
                ? track.artists.map((item) => item.name)
                : track.artists.map((item) => `${item.name} `)
            }`;

            return (
              <ClickAwayListener
                key={track.id}
                onClickAway={() => setShowRightClickOption(false)}
              >
                <Grid item>
                  <Card
                    className={classes.trackItemCard}
                    onContextMenu={(e) => rightClickHandler(e, track.id)}
                  >
                    {showRightClickOption && activeTrackId === track.id && (
                      <RightClickOptions
                        options={[
                          trackUri === track.uri
                            ? isSongPlaying
                              ? "pause"
                              : "play"
                            : "play",
                          "remove from favorite",
                        ]}
                        id={track.id}
                        uri={track.uri}
                        type={track.type}
                        artists={track.artists}
                      />
                    )}
                    <CardActionArea>
                      <div
                        className={styles.trackItem}
                        onClick={() => setTrackUri(track.uri)}
                      >
                        <div className={styles.trackItemImage}>
                          <Image
                            loader={() => track.image.url}
                            unoptimized
                            width={225}
                            height={225}
                            src={track.image.url}
                            alt="new-release-img"
                          />
                          <div
                            className={`${"playPauseIcon"} ${
                              styles.trackIcon
                            } ${
                              trackUri === track.uri
                                ? "activePlayPauseIcon"
                                : ""
                            }`}
                          >
                            <PlayPauseBtn itemUri={track.uri} />
                          </div>
                        </div>

                        <Typography
                          variant="subtitle2"
                          color="primary"
                          className={classes.playlistName}
                        >
                          {track.name.trim().length > 24
                            ? `${track.name.slice(0, 24)}...`
                            : track.name}
                        </Typography>

                        <Typography variant="caption" color="textSecondary">
                          {artistName.trim().length > 30
                            ? `${artistName.slice(0, 30)}...`
                            : artistName}
                        </Typography>
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
              </ClickAwayListener>
            );
          })
        ) : (
          <Skeletons
            numberOfSkeleton={12}
            width1={225}
            height1={225}
            width2={225}
            height2={30}
            borderRadius1={4}
          />
        )}
      </Grid>
    </div>
  );
};

export default SavedTracks;

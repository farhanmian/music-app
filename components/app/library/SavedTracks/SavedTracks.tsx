import React from "react";
import styles from "./SavedTracks.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { TrackType } from "../../../../store/types/types";
import Image from "next/image";

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
});

const SavedTracks: React.FC<{
  data: TrackType[];
}> = ({ data }) => {
  const classes = useStyles();
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
        {data.length > 0 &&
          data.map((track: TrackType) => {
            return (
              <Grid key={track.id} item>
                <div className={styles.trackItem}>
                  <div className={styles.trackItemImage}>
                    <Image
                      loader={() => track.image.url}
                      unoptimized
                      width={225}
                      height={225}
                      src={track.image.url}
                      alt="new-release-img"
                    />
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
                    {track.artist.name}
                  </Typography>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default SavedTracks;

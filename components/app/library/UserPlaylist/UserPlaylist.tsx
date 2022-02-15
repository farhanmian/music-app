import React from "react";
import styles from "./UserPlaylist.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { LibraryPlaylistType } from "../../../../store/types/types";
import LibraryPlaylistItem from "../../../partials/LibraryPlaylistItem/LibraryPlaylistItem";

const useStyles = makeStyles({
  userPlaylistContainer: {
    marginTop: 30,
  },
  heading: {
    textTransform: "capitalize",
  },
});

const UserPlaylist: React.FC<{
  data: LibraryPlaylistType[];
  heading: string;
  path: string;
}> = ({ data, heading, path }) => {
  const classes = useStyles();

  return (
    <div className={styles.innerContainer}>
      <Typography variant="h6" color="primary" className={classes.heading}>
        {heading}
      </Typography>

      <Grid
        container
        columnGap="26px"
        rowGap="48px"
        className={classes.userPlaylistContainer}
      >
        {data.length > 0 &&
          data.map((playlist: LibraryPlaylistType) => {
            return (
              <Grid key={playlist.id} item>
                <LibraryPlaylistItem
                  key={playlist.id}
                  playlist={playlist}
                  link={`${path}/${playlist.id}`}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default UserPlaylist;

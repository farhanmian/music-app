import React from "react";
import styles from "./UserPlaylist.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { LibraryPlaylistType } from "../../../../store/types/types";
import LibraryPlaylistItem from "../../../partials/LibraryPlaylistItem/LibraryPlaylistItem";
import Skeletons from "../../../partials/Skeletons/Skeletons";
import NoResultFound from "../../../partials/NoResultFound/NoResultFound";

const useStyles = makeStyles({
  userPlaylistContainer: {
    marginTop: 30,
  },
  heading: {
    textTransform: "capitalize",
  },
});

const UserPlaylist: React.FC<{
  item: { show: boolean; data: LibraryPlaylistType[] };
  heading: string;
  path: string;
}> = ({ item, heading, path }) => {
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
        {item.show &&
          (item.data.length > 0 ? (
            item.data.map((playlist: LibraryPlaylistType) => {
              return (
                <Grid key={playlist.id} item>
                  <LibraryPlaylistItem
                    key={playlist.id}
                    playlist={playlist}
                    link={`${path}/${playlist.id}`}
                  />
                </Grid>
              );
            })
          ) : (
            <Skeletons
              numberOfSkeleton={6}
              width1={225}
              height1={225}
              width2={225}
              height2={30}
              borderRadius1={4}
            />
          ))}

        {!item.show && <NoResultFound />}
      </Grid>
    </div>
  );
};

export default UserPlaylist;

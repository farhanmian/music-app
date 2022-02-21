import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import styles from "./GenresPlaylist.module.css";
import { useAppContext } from "../../../../../store/context/appContext";
import { CategoryPlaylist } from "../../../../../store/types/types";
import PlaylistItem from "../../../../partials/PlaylistItem/PlaylistItem";
import Skeletons from "../../../../partials/Skeletons/Skeletons";

const useStyles = makeStyles({
  heading: {
    marginBottom: 55,
    textTransform: "capitalize",
  },
  popularPlaylistHeading: {
    textTransform: "none",
    marginBottom: 30,
  },
  errorMsge: {
    marginTop: 50,
    textAlign: "center",
    WebkitBackgroundClip: "text",
  },
});

const GenresPlaylist: React.FC<{ query: string }> = ({ query }) => {
  const classes = useStyles();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx
      .getPlaylistsForCategory(query, { limit: 30 })
      .then((res) => {
        console.log(res);
        const transformedData: CategoryPlaylist[] = [];
        res.body.playlists.items.map((playlist: CategoryPlaylist) => {
          transformedData.push({
            name: playlist.name,
            id: playlist.id,
            images: { url: playlist.images[0].url },
            type: playlist.type,
            uri: playlist.uri,
          });
        });

        setFetchedData(transformedData);
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  }, [accessToken, spotifyApiCtx]);

  return (
    <div className={styles.genrePlaylistInnerContainer}>
      <Typography variant="h1" color="primary" className={classes.heading}>
        {query}
      </Typography>

      <Typography
        variant="h6"
        color="primary"
        className={classes.popularPlaylistHeading}
      >
        Popular playlist
      </Typography>

      {!error ? (
        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.genrePlaylistItemContainer}
        >
          {fetchedData.length > 0 ? (
            fetchedData.map((item: CategoryPlaylist) => {
              return (
                <Grid key={item.id} item>
                  <PlaylistItem playlist={item} link={`/playlist/${item.id}`} />
                </Grid>
              );
            })
          ) : (
            <Skeletons
              numberOfSkeleton={18}
              width1={225}
              height1={235}
              width2={225}
              height2={25}
              borderRadius1={8}
            />
          )}
        </Grid>
      ) : (
        <Typography
          variant="h3"
          className={classes.errorMsge}
          color="textSecondary"
        >
          Playlist Not Found!
        </Typography>
      )}
    </div>
  );
};

export default GenresPlaylist;

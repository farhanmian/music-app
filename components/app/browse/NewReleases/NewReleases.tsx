import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./NewRelease.module.css";
import { useAppContext } from "../../../../store/context/appContext";
import { NewReleaseItemType } from "../../../../store/types/types";
import NewReleaseItem from "../../../partials/NewReleaseItem/NewReleaseItem";

const useStyles = makeStyles({
  heading: {
    marginBottom: 30,
  },
  newReleaseName: {
    textTransform: "capitalize",
    marginBottom: 5,
  },
});

const NewReleases = () => {
  const classes = useStyles();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [newReleases, setNewReleases] = useState([]);

  /**
   * fetching data
   */
  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx.getNewReleases({ limit: 30 }).then((res) => {
      // console.log(res.body.albums.items);
      console.log(res);
      const transformedData: NewReleaseItemType[] = [];
      res.body.albums.items.map((item) => {
        transformedData.push({
          type: item.type,
          name: item.name,
          image: { url: item.images[1].url },
          id: item.id,
          artists: item.artists,
        });
      });
      setNewReleases(transformedData);
    });
  }, [accessToken, spotifyApiCtx]);

  return (
    <React.Fragment>
      <div className={styles.newReleasesInnerContainer}>
        <Typography variant="h6" color="primary" className={classes.heading}>
          Top releases
        </Typography>

        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.newReleasesItemContainer}
        >
          {newReleases.length > 0 &&
            newReleases.map((item: NewReleaseItemType) => {
              return <NewReleaseItem key={item.id} newRelease={item} />;
            })}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default NewReleases;

import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./NewRelease.module.css";
import Image from "next/image";
import { useAppContext } from "../../../../store/context/appContext";
import { NewReleaseItem } from "../../../../store/types/types";
import NextLink from "next/link";

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

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx.getNewReleases({ limit: 30 }).then((res) => {
      // console.log(res.body.albums.items);
      console.log(res);
      const transformedData: NewReleaseItem[] = [];
      res.body.albums.items.map((item: NewReleaseItem) => {
        transformedData.push({
          type: item.type,
          name: item.name,
          images: { url: item.images[1].url },
          id: item.id,
          artists: {
            name: item.artists[0].name,
            id: item.artists[0].id,
          },
        });
      });
      setNewReleases(transformedData);
    });

    // spotifyApiCtx.getAlbum("2ptlvk4iUKk88X0DfEzBm7").then((res) => {
    //   console.log(res);
    // });
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
            newReleases.map((item: NewReleaseItem) => {
              return (
                <NextLink
                  key={item.id}
                  href={`/browse/newReleases-album-${item.id}`}
                >
                  <Grid item className={styles.newReleaseItem}>
                    <div className={styles.newReleaseItemImage}>
                      <Image
                        loader={() => item.images.url}
                        unoptimized
                        width={225}
                        height={225}
                        src={item.images.url}
                        alt="img"
                      />
                    </div>

                    <Typography
                      variant="body2"
                      className={classes.newReleaseName}
                      color="primary"
                    >
                      {item.name.trim().length > 24
                        ? `${item.name.slice(0, 24)}...`
                        : item.name}
                    </Typography>

                    <Typography variant="caption" color="textSecondary">
                      {item.artists.name}
                    </Typography>
                  </Grid>
                </NextLink>
              );
            })}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default NewReleases;

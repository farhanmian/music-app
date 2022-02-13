import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useAppContext } from "../../../../store/context/appContext";
import styles from "./Genres.module.css";
import { Categories } from "../../../../store/types/types";
import CategoryItem from "../../../partials/CategoryItem/CategoryItem";

const useStyles = makeStyles({
  genresHeading: {
    fontWeight: "bold",
  },
});

const Genres = () => {
  const classes = useStyles();
  const { spotifyApiCtx, accessToken } = useAppContext();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;
    spotifyApiCtx
      .getCategories({ limit: 30 })
      .then((res: { body: { categories: { items: Categories[] } } }) => {
        console.log(res);
        const data = res.body.categories;
        setGenres(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, spotifyApiCtx]);

  return (
    <React.Fragment>
      <div className={styles.genresInnerContainer}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.genresHeading}
        >
          Genres
        </Typography>

        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.genresItemContainer}
        >
          {genres.length > 0 &&
            genres.map((genre: Categories) => {
              return (
                <Grid key={genre.id} id={genre.id} item>
                  <CategoryItem item={genre} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Genres;

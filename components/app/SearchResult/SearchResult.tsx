import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useAppContext } from "../../../store/context/appContext";
import styles from "./SearchResult.module.css";
import { Grid } from "@mui/material";
import NewReleaseItem from "../../partials/NewReleaseItem/NewReleaseItem";

const useStyles = makeStyles({});

const SearchResult = () => {
  const classes = useStyles();
  const { searchValue, accessToken, spotifyApiCtx } = useAppContext();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;
    if (searchValue.trim().length === 0) {
      setSearchResult([]);
      return;
    }

    spotifyApiCtx.searchTracks(searchValue).then((res) => {
      console.log(res);
      // res.body.tracks.items.map(item => {

      // })
    });
  }, [searchValue, accessToken, spotifyApiCtx]);

  return (
    <section className={styles.searchResult}>
      <div className={styles.innerContainer}>
        <Grid container className={styles.searchResultContainer}>
          {searchResult.map((item) => {
            return (
              <Grid key={item.id} item>
                {/* <NewReleaseItem /> */}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default SearchResult;

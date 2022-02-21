import React, { useEffect, useState } from "react";
import styles from "./FeaturedEpisodes.module.css";
import { useAppContext } from "../../../../store/context/appContext";
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import { Categories, FeaturedEpisode } from "../../../../store/types/types";
import Image from "next/image";
import Divider from "../../../partials/Divider/Divider";
import CategoryItem from "../../../partials/CategoryItem/CategoryItem";
import Skeletons from "../../../partials/Skeletons/Skeletons";
import PlayPauseBtn from "../../../partials/PlayPauseBtn/PlayPauseBtn";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
  heading: {
    marginBottom: 30,
  },

  featuredEpisodesHeading: {
    textTransform: "none",
    marginBottom: 40,
  },
  episodeName: {
    marginBottom: 3,
  },
  featuredEpisodeCard: {
    backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "none",
    "& > button": {
      paddingBottom: 5,
      borderRadius: 4,
      transition: "all .3s",
      "&:hover": {
        transform: "scale(.97)",
      },
    },
  },
});

export default function FeaturedEpisodes() {
  const classes = useStyles();
  const router = useRouter();
  const { spotifyApiCtx, accessToken, trackUri } = useAppContext();
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hover, setHover] = useState(false);

  /**
   * fetching data
   */
  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    // featured playlist
    spotifyApiCtx
      .getFeaturedPlaylists()
      .then((res: { body: { playlists: { items: [] } } }) => {
        const transformedData: FeaturedEpisode[] = [];
        res.body.playlists.items.map((playlist: FeaturedEpisode) => {
          transformedData.push({
            id: playlist.id,
            images: { url: playlist.images[0].url },
            name: playlist.name,
            description: playlist.description,
            uri: playlist.uri,
          });
        });
        setFeaturedEpisodes(transformedData);
      });

    // get categories
    spotifyApiCtx
      .getCategories({ limit: 12 })
      .then((res: { body: { categories: { items: Categories[] } } }) => {
        const data = res.body.categories;
        setGenres(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, spotifyApiCtx]);

  const openFeaturedEpisodeHandler = (id) => {
    if (hover) return;
    router.push(`playlist/${id}`);
  };

  return (
    <React.Fragment>
      <div className={styles.featuredEpisodesContainer}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.featuredEpisodesHeading}
        >
          Featured episodes
        </Typography>

        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.featuredEpisodesItemContainer}
        >
          {featuredEpisodes.length > 0 &&
            featuredEpisodes.map((episode: FeaturedEpisode) => {
              return (
                <Grid
                  key={episode.id}
                  item
                  className={styles.featuredEpisodesItem}
                >
                  <Card
                    className={classes.featuredEpisodeCard}
                    onClick={() => openFeaturedEpisodeHandler(episode.id)}
                  >
                    <CardActionArea>
                      <div className={styles.featuredEpisodesImage}>
                        <Image
                          loader={() => episode.images.url}
                          unoptimized
                          width={100}
                          height={100}
                          src={episode.images.url}
                          alt="featured-episode-img"
                        />

                        <div
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                          className={`${"playPauseIcon"} ${
                            styles.playPauseIcon
                          } ${
                            trackUri === episode.uri
                              ? "activePlayPauseIcon"
                              : ""
                          }`}
                        >
                          <PlayPauseBtn itemUri={episode.uri} />
                        </div>
                      </div>

                      <div className={styles.featuredEpisodesText}>
                        <Typography
                          variant="body2"
                          color="primary"
                          className={classes.episodeName}
                        >
                          {episode.name.trim().length > 24
                            ? `${episode.name.slice(0, 24)}...`
                            : episode.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {episode.description.trim().length > 60
                            ? `${episode.description.slice(0, 60)}...`
                            : episode.description}
                        </Typography>
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}

          {featuredEpisodes.length === 0 && (
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
      <Divider />

      <div className={styles.categoriesContainer}>
        <Typography variant="h6" className={classes.heading} color="primary">
          Categories
        </Typography>

        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.categoriesItemContainer}
        >
          {genres.length > 0 ? (
            genres.map((genre: Categories) => {
              return (
                <Grid key={genre.id} item>
                  <CategoryItem item={genre} />
                </Grid>
              );
            })
          ) : (
            <Skeletons
              numberOfSkeleton={12}
              width1={225}
              height1={128}
              width2={0}
              height2={0}
              borderRadius1={8}
            />
          )}
        </Grid>
      </div>
    </React.Fragment>
  );
}

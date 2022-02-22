import React, { useEffect, useState } from "react";
import styles from "../../styles/Artist.module.css";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import {
  Button,
  Card,
  CardActionArea,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import HeartOutlined from "../../components/icons/HeartOutlined";
import { useAppContext } from "../../store/context/appContext";
import Skeletons from "../../components/partials/Skeletons/Skeletons";
import {
  ArtistType,
  NewReleaseItemType,
  Tracks,
  UserDataContainer,
} from "../../store/types/types";
import ThreeDots from "../../components/icons/ThreeDots";
import { Favorite } from "@mui/icons-material";
import { Grid } from "@mui/material";
import NewReleaseItem from "../../components/partials/NewReleaseItem/NewReleaseItem";
import Artists from "../../components/partials/Artists/Artists";
import Divider from "../../components/partials/Divider/Divider";

const useStyles = makeStyles({
  artistDetailOptionBtn: {
    minWidth: 168,
    maxWidth: 168,
    height: 40,
    textTransform: "uppercase",
    borderRadius: 40,
    backgroundImage:
      "linear-gradient(to right, #35EDFB -47%, #2D9BEF 40%, #9B2DEF 129%)",
    marginRight: 20,
    transition: "all .3s",
    "&:hover": {
      boxShadow: "0 2px 5px #088dff52",
    },
    "&:active": {
      boxShadow: "0 0px 3px #088dff52",
    },
  },
  artistDetailOptionBtnText: {
    fontWeight: "bold",
  },
  artistDetailHeartBtn: {
    marginRight: 20,
  },
  artistDetailBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    minWidth: 40,
    maxWidth: 40,
    height: 40,
    padding: 0,
  },
  trackCard: {
    background: "transparent",
    boxShadow: "none",
    color: "rgba(225,225,225, .4)",
  },
  favoriteIcon: {
    color: "#1ED760",
  },
  fontSize15: {
    fontSize: 15,
  },
  artistName: {
    wordSpacing: 3,
  },
  margin32: {
    marginBottom: 32,
    position: "relative",
    textAlign: "start",
  },
  albumHeading: {
    fontSize: 22,
    zIndex: 5,
  },
  showMoreBtn: {
    padding: 0,
    minWidth: 158,
    maxWidth: 158,
    height: 40,
    borderRadius: 20,
    border: "2px solid #fff",
    marginTop: 30,
  },
});

const artist = () => {
  const classes = useStyles();
  const {
    spotifyApiCtx,
    accessToken,
    setTrackUri,
    trackUri,
    setIsSongPlaying,
    isSongPlaying,
    currentSongName,
    userData,
    setUserData,
  } = useAppContext();
  const router = useRouter();
  const id = router.query.artist;
  const [artistDetails, setArtistDetails] = useState<ArtistType>(null);
  const [artistTracks, setArtistTracks] = useState<Tracks[]>([]);
  const [artistAlbum, setArtistAlbum] = useState<NewReleaseItemType[]>([]);
  const [hover, setHover] = useState(false);
  const [showMoreTracks, setShowMoreTracks] = useState(false);
  const [showMoreAlbums, setShowMoreAlbums] = useState(false);
  const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    if (!spotifyApiCtx || !accessToken || !id) return;

    /**artist info */
    spotifyApiCtx.getArtist(id).then((res) => {
      setArtistDetails({
        name: res.body.name,
        id: res.body.id,
        type: res.body.type,
        uri: res.body.uri,
        images: { url: res.body.images[1].url },
        popularity: res.body.followers.total,
      });
    });

    /**artist tracks */
    spotifyApiCtx.getArtistTopTracks(id, "GB").then((res) => {
      const transformedData: Tracks[] = [];
      res.body.tracks.map((item) => {
        transformedData.push({
          name: item.name,
          id: item.id,
          uri: item.uri,
          type: item.type,
          artists: item.artists,
          albumName: item.album.name,
        });
      });
      setArtistTracks(transformedData);
    });

    spotifyApiCtx.getArtistAlbums(id).then((res) => {
      const transformedData: NewReleaseItemType[] = [];
      res.body.items.map((item) => {
        transformedData.push({
          name: item.name,
          id: item.id,
          type: item.type,
          uri: item.uri,
          artists: item.artists,
          image: { url: item.images[1].url },
        });
      });
      setArtistAlbum(transformedData);
    });

    /**related artists */
    spotifyApiCtx.getArtistRelatedArtists(id).then((res) => {
      const transformedData: ArtistType[] = [];
      res.body.artists.map((item) => {
        transformedData.push({
          name: item.name,
          type: item.type,
          id: item.id,
          images: { url: item.images[1].url },
          uri: item.uri,
          popularity: item.popularity,
        });
      });
      setRelatedArtists(transformedData);
    });
  }, [accessToken, spotifyApiCtx, id]);

  const playSongHandler = (uri: string) => {
    if (hover) return;
    setTrackUri(uri);
  };

  const addToFavoriteHandler = (id: string) => {
    if (!spotifyApiCtx || !accessToken) return;
    spotifyApiCtx.addToMySavedTracks([id]);
    const data: UserDataContainer = userData;
    data.tracks.push(id);
    setUserData(data);
  };
  const removeFavoriteHandler = (id: string) => {
    spotifyApiCtx.removeFromMySavedTracks([id]);
    const data: UserDataContainer = userData;
    data.tracks = data.tracks.filter((item) => item !== id);
    setUserData(data);
  };

  const ShowMoreBtn: React.FC<{ onClickProp: () => void }> = ({
    onClickProp,
  }) => (
    <Button
      variant="outlined"
      className={classes.showMoreBtn}
      onClick={onClickProp}
    >
      <Typography variant="body2" color="primary">
        Show More
      </Typography>
    </Button>
  );

  return (
    <section className={styles.artist}>
      <div className={styles.innerContainer}>
        {/* artist details */}
        {artistDetails ? (
          <div className={styles.artistDetailsContainer}>
            <div className={styles.artistDetailImageContainer}>
              <Image
                loader={() => artistDetails.images.url}
                unoptimized
                width={225}
                height={225}
                src={artistDetails.images.url}
                alt="new-release-img"
              />
            </div>

            <div className={styles.artistDetailTextContainer}>
              <Typography variant="subtitle1" color="primary">
                {artistDetails.type}
              </Typography>

              <Typography variant="h2" color="primary">
                {artistDetails.name}
              </Typography>
            </div>

            <div className={styles.artistDetailOptionsContainer}>
              <Button
                variant="contained"
                className={classes.artistDetailOptionBtn}
                disableElevation
                onClick={() => {
                  setTrackUri(artistDetails.uri);
                  artistDetails.uri === trackUri &&
                    setIsSongPlaying((prevState) => !prevState);
                }}
              >
                <Typography
                  variant="subtitle2"
                  className={classes.artistDetailOptionBtnText}
                  color="primary"
                >
                  {artistDetails.uri === trackUri
                    ? `${isSongPlaying ? "Pause" : "Play"}`
                    : "Play"}
                </Typography>
              </Button>

              <Button
                variant="outlined"
                color="primary"
                className={`${classes.artistDetailBtn} ${classes.artistDetailHeartBtn}`}
              >
                <HeartOutlined />
              </Button>

              <Button
                variant="outlined"
                color="primary"
                className={`${classes.artistDetailBtn} ${classes.artistDetailHeartBtn}`}
              >
                <ThreeDots />
              </Button>
            </div>

            <span className={styles.artistDetailFollowersContainer}>
              <Typography variant="subtitle2" color="textSecondary">
                {artistDetails.popularity} followers
              </Typography>
            </span>
          </div>
        ) : (
          <Skeletons
            numberOfSkeleton={1}
            width1={1480}
            height1={235}
            width2={0}
            height2={0}
            borderRadius1={8}
          />
        )}

        {/* artist top tracks */}
        <div className={styles.tracksContainer}>
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.margin32}
          >
            Popular Songs
          </Typography>
          <div className={styles.tracksHeadingContainer}>
            <Typography variant="caption" color="textSecondary">
              <span className={styles.tracksHeadingTitleHash}>#</span>
              TITLE
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ARTIST
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ALBUM
            </Typography>
          </div>

          <div className={styles.tracksInnerContainer}>
            {artistTracks.length > 0 ? (
              artistTracks
                .slice(0, showMoreTracks ? artistTracks.length : 5)
                .map((track: Tracks, i) => {
                  const artistDetail = track.artists.map((item) => {
                    return {
                      name: item.name,
                      id: item.id,
                    };
                  });

                  return (
                    track.name && (
                      <Card key={i} className={classes.trackCard}>
                        <CardActionArea>
                          <div
                            className={`${styles.track} ${
                              currentSongName === track.name
                                ? styles.activetrack
                                : ""
                            }`}
                            onClick={() => playSongHandler(track.uri)}
                          >
                            <div className={styles.playlistNameNImage}>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                className={classes.fontSize15}
                              >
                                {i + 1}
                              </Typography>

                              <Typography
                                variant="caption"
                                className={classes.fontSize15}
                                color="primary"
                              >
                                {track.name.trim().length > 35
                                  ? `${track.name.slice(0, 35)}...`
                                  : track.name}
                              </Typography>
                            </div>

                            <div className={styles.artistNameContainer}>
                              {artistDetail.map((item) => {
                                return (
                                  <Link
                                    key={item.id}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    onClick={() => {
                                      if (id === item.id) return;
                                      router.push(`/artist/${item.id}`);
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      color="primary"
                                      className={`${classes.artistName} ${classes.fontSize15}`}
                                    >
                                      {item.name}
                                    </Typography>
                                  </Link>
                                );
                              })}
                            </div>

                            <Typography
                              variant="caption"
                              color="primary"
                              className={classes.fontSize15}
                            >
                              {/* album */}
                              {track.albumName}
                            </Typography>

                            <div
                              className={styles.playlistOptionsContainer}
                              onMouseEnter={() => setHover(true)}
                              onMouseLeave={() => setHover(false)}
                            >
                              {userData.tracks.includes(track.id) ? (
                                <span
                                  onClick={() =>
                                    removeFavoriteHandler(track.id)
                                  }
                                >
                                  <Favorite className={classes.favoriteIcon} />
                                </span>
                              ) : (
                                <span
                                  onClick={() => addToFavoriteHandler(track.id)}
                                >
                                  <HeartOutlined />
                                </span>
                              )}
                            </div>
                          </div>
                        </CardActionArea>
                      </Card>
                    )
                  );
                })
            ) : (
              <Skeletons
                numberOfSkeleton={6}
                width1={1460}
                height1={60}
                width2={0}
                height2={0}
                borderRadius1={4}
              />
            )}

            {!showMoreTracks && artistTracks.length > 5 && (
              <ShowMoreBtn
                onClickProp={() => {
                  setShowMoreTracks(true);
                }}
              />
            )}
          </div>
        </div>

        {/* artist albums */}
        <div className={styles.albumContainer}>
          <Typography
            variant="body2"
            className={`${classes.margin32} ${classes.albumHeading}`}
            color="primary"
          >
            Album
          </Typography>

          <Grid
            container
            columnGap="26px"
            rowGap="48px"
            className={styles.albumItemContainer}
          >
            {artistAlbum.length > 0 ? (
              artistAlbum
                .slice(0, showMoreAlbums ? artistAlbum.length : 12)
                .map((item: NewReleaseItemType) => {
                  return <NewReleaseItem key={item.id} newRelease={item} />;
                })
            ) : (
              <Skeletons
                numberOfSkeleton={18}
                width1={225}
                height1={225}
                width2={225}
                height2={30}
                borderRadius1={8}
              />
            )}
          </Grid>

          {!showMoreAlbums && artistAlbum.length > 12 && (
            <ShowMoreBtn
              onClickProp={() => {
                setShowMoreAlbums(true);
              }}
            />
          )}
        </div>
        <Divider />

        {/* related artists */}
        <Artists artists={relatedArtists} heading="Fans Also Like" />
      </div>
      <div
        style={{
          backgroundImage:
            artistDetails &&
            `linear-gradient( to right bottom, rgba(42, 13, 25, 0.5), rgba(29, 9, 44, 0.718) ), url(${artistDetails.images.url})`,
        }}
        className={styles.playlistBackground}
      />
    </section>
  );
};

export default artist;

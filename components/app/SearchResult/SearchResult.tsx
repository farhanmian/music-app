import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../store/context/appContext";
import styles from "./SearchResult.module.css";
import { Grid } from "@mui/material";
import {
  ArtistType,
  LibraryPlaylistType,
  NewReleaseItemType,
  SearchTrackType,
} from "../../../store/types/types";
import SearchResultItem from "./SearchResultItem/SearchResultItem";
import LibraryPlaylistItem from "../../partials/LibraryPlaylistItem/LibraryPlaylistItem";
import Artist from "../../partials/Artists/Artist/Artist";
import NewReleaseItem from "../../partials/NewReleaseItem/NewReleaseItem";
import Skeletons from "../../partials/Skeletons/Skeletons";

const randomSearchValues = [
  "justin",
  "enrique",
  "taylor",
  "selena",
  "ed",
  "dua",
];

const randomSearch = () => {
  const min = Math.ceil(0);
  const max = Math.ceil(randomSearchValues.length);
  const random = Math.floor(Math.random() * (max - min));
  return randomSearchValues[random];
};

const SearchResult = () => {
  const { searchValue, accessToken, spotifyApiCtx, searchType } =
    useAppContext();
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchPlaylists, setSearchPlaylists] = useState([]);
  const [searchArtists, setSearchArtists] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);
  const random = randomSearch();

  /**
   * fetching data
   */
  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    const condition = searchValue.trim().length === 0;

    const timeoutId = setTimeout(() => {
      if (searchType === "songs") {
        spotifyApiCtx
          .searchTracks(condition ? random : searchValue)
          .then((res) => {
            const transformedData: SearchTrackType[] = [];
            res.body.tracks.items.map((item) => {
              transformedData.push({
                name: item.name,
                type: item.type,
                id: item.id,
                uri: item.uri,
                artists: item.artists,
                image: { url: item.album.images[1].url },
              });
            });
            setSearchTracks(transformedData);
          });
      }
      if (searchType === "playlists") {
        spotifyApiCtx
          .searchPlaylists(condition ? random : searchValue)
          .then((res) => {
            const transformedData: LibraryPlaylistType[] = [];
            res.body.playlists.items.map((item) => {
              transformedData.push({
                name: item.name,
                id: item.id,
                type: item.type,
                images: { url: item.images[0].url },
                noOfSongs: item.tracks.total,
                uri: item.uri,
              });
            });
            setSearchPlaylists(transformedData);
          });
      }
      if (searchType === "artists") {
        spotifyApiCtx
          .searchArtists(condition ? random : searchValue)
          .then((res) => {
            const transformedData: ArtistType[] = [];
            res.body.artists.items.map((item) => {
              transformedData.push({
                name: item.name,
                id: item.id,
                images: {
                  url: `${
                    item.images.length > 0
                      ? item.images[1].url
                      : "https://www.clipartmax.com/png/full/449-4492509_lefroy-ice-breakers-minor-hockey-tournament-sorry-no-image-available.png"
                  }`,
                },
                type: item.type,
                popularity: item.popularity,
                uri: item.uri,
              });
            });
            setSearchArtists(transformedData);
          });
      }
      if (searchType === "albums") {
        spotifyApiCtx
          .searchAlbums(condition ? random : searchValue)
          .then((res) => {
            const transformedData: NewReleaseItemType[] = [];
            res.body.albums.items.map((item) => {
              transformedData.push({
                name: item.name,
                id: item.id,
                type: item.type,
                image: { url: item.images[0].url },
                artists: item.artists,
                uri: item.uri,
              });
            });
            setSearchAlbums(transformedData);
          });
      }
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [searchValue, accessToken, spotifyApiCtx, searchType]);

  return (
    <section id="searchResult" className={styles.searchResult}>
      <div className={styles.innerContainer}>
        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={`${styles.searchResultContainer} ${styles.searchResultContainerSpacing} `}
          justifyContent="center"
        >
          {searchType === "songs" &&
            (searchTracks.length > 0 ? (
              searchTracks.map((item) => {
                return (
                  <Grid key={item.id} item>
                    <SearchResultItem track={item} />
                  </Grid>
                );
              })
            ) : (
              <Skeletons
                numberOfSkeleton={12}
                width1={225}
                height1={235}
                width2={225}
                height2={20}
                borderRadius1={8}
              />
            ))}

          {searchType === "playlists" &&
            (searchPlaylists.length > 0 ? (
              searchPlaylists.map((item) => {
                return (
                  <Grid key={item.id} item>
                    <LibraryPlaylistItem
                      playlist={item}
                      link={`/playlist/${item.id}`}
                    />
                  </Grid>
                );
              })
            ) : (
              <Skeletons
                numberOfSkeleton={12}
                width1={225}
                height1={235}
                width2={225}
                height2={20}
                borderRadius1={8}
              />
            ))}

          {searchType === "artists" &&
            (searchArtists.length > 0 ? (
              searchArtists.map((item: ArtistType) => {
                return (
                  <Grid key={item.id} item>
                    <Artist artist={item} />
                  </Grid>
                );
              })
            ) : (
              <Skeletons
                numberOfSkeleton={12}
                width1={225}
                height1={235}
                width2={225}
                height2={20}
                borderRadius1={8}
              />
            ))}

          {searchType === "albums" &&
            (searchAlbums.length > 0 ? (
              searchAlbums.map((item) => {
                return (
                  <Grid key={item.id} item>
                    <NewReleaseItem newRelease={item} />
                  </Grid>
                );
              })
            ) : (
              <Skeletons
                numberOfSkeleton={12}
                width1={225}
                height1={235}
                width2={225}
                height2={20}
                borderRadius1={8}
              />
            ))}
        </Grid>
      </div>
    </section>
  );
};

export default SearchResult;

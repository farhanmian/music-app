import React, { useEffect, useState } from "react";
import SavedTracks from "../../components/app/library/SavedTracks/SavedTracks";
import UserPlaylist from "../../components/app/library/UserPlaylist/UserPlaylist";
import { useAppContext } from "../../store/context/appContext";
import { LibraryPlaylistType, TrackType } from "../../store/types/types";
import styles from "../../styles/Library.module.css";

const index = () => {
  const { activeNavLinkCtx, accessToken, spotifyApiCtx } = useAppContext();
  const [playlistData, setPlaylistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [podcastData, setPodcastData] = useState([]);
  const [tracksData, setTracksData] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    if (activeNavLinkCtx === "playlists") {
      /** getting user's playlist */
      spotifyApiCtx.getUserPlaylists().then((res) => {
        console.log(res);
        const transformedData: LibraryPlaylistType[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.name,
            id: item.id,
            type: item.type,
            images: { url: item.images[1].url },
            noOfSongs: item.tracks.total,
          });
        });
        setPlaylistData(transformedData);
      });
    }
    if (activeNavLinkCtx === "albums") {
      spotifyApiCtx.getMySavedAlbums().then((res) => {
        console.log(res);
        const transformedData: LibraryPlaylistType[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.album.name,
            id: item.album.id,
            type: item.album.type,
            noOfSongs: item.album.total_tracks,
            images: { url: item.album.images[1].url },
          });
        });
        setAlbumData(transformedData);
      });
    }
    if (activeNavLinkCtx === "podcasts") {
      spotifyApiCtx
        .getMySavedShows()
        .then((res) => {
          console.log(res);
          const transformedData: LibraryPlaylistType[] = [];
          res.body.items.map((item) => {
            transformedData.push({
              name: item.show.name,
              id: item.show.id,
              type: item.show.type,
              images: { url: item.show.images[1].url },
              noOfSongs: item.show.total_episodes,
            });
          });
          setPodcastData(transformedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeNavLinkCtx === "tracks") {
      spotifyApiCtx.getMySavedTracks().then((res) => {
        console.log(res);
        const transformedData: TrackType[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.track.name,
            id: item.track.id,
            type: item.track.type,
            uri: item.track.uri,
            // artist: [
            //   item.track.artists.map((item) => {
            //     return { name: item.name, id: item.id };
            //   }),
            // ],
            artist: {
              name: item.track.artists[0].name,
              id: item.track.artists[0].id,
            },
            image: { url: item.track.album.images[1].url },
          });
        });
        setTracksData(transformedData);
      });
    }
  }, [accessToken, spotifyApiCtx, activeNavLinkCtx]);

  return (
    <section className={styles.library}>
      {activeNavLinkCtx === "playlists" && (
        <UserPlaylist
          data={playlistData}
          path="playlist"
          heading="my playlists"
        />
      )}
      {activeNavLinkCtx === "albums" && (
        <UserPlaylist data={albumData} path="album" heading="my albums" />
      )}
      {activeNavLinkCtx === "podcasts" && (
        <UserPlaylist data={podcastData} path="podcast" heading="my podcasts" />
      )}
      {activeNavLinkCtx === "tracks" && <SavedTracks data={tracksData} />}
    </section>
  );
};

export default index;

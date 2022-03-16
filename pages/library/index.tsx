import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SavedTracks from "../../components/app/library/SavedTracks/SavedTracks";
import UserPlaylist from "../../components/app/library/UserPlaylist/UserPlaylist";
import { useAppContext } from "../../store/context/appContext";
import { LibraryPlaylistType, TrackType } from "../../store/types/types";
import styles from "../../styles/Library.module.css";

const index = () => {
  const { accessToken, spotifyApiCtx, userSavedTracks, userSavedAlbums } =
    useAppContext();
  const router = useRouter();
  const activeTab = router.query.tab;
  const [playlistData, setPlaylistData] = useState({ show: true, data: [] });
  const [albumData, setAlbumData] = useState({ show: true, data: [] });
  const [tracksData, setTracksData] = useState({ show: true, data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    () => clearTimeout(timeout);
  }, [accessToken, spotifyApiCtx]);

  useEffect(() => {
    if (router.asPath === "/library") {
      router.replace("library/?tab=playlists");
    }

    if (!accessToken || !spotifyApiCtx) return;
    if (loading) return;

    if (activeTab === "playlists") {
      /** getting user's playlist */
      spotifyApiCtx.getUserPlaylists().then((res) => {
        const transformedData: LibraryPlaylistType[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.name,
            id: item.id,
            type: item.type,
            images: { url: item.images[1].url },
            noOfSongs: item.tracks.total,
            uri: item.uri,
          });
        });
        setPlaylistData({ show: true, data: transformedData });

        if (res.body.total === 0) {
          setPlaylistData({ show: false, data: [] });
        }
      });
    }
    if (activeTab === "albums") {
      if (userSavedAlbums.length === 0) {
        setAlbumData({ show: false, data: [] });
        return;
      }
      spotifyApiCtx.getAlbums(userSavedAlbums).then((res) => {
        const transformedData: LibraryPlaylistType[] = [];
        res.body.albums.map((item) => {
          transformedData.push({
            name: item.name,
            id: item.id,
            type: item.type,
            noOfSongs: item.total_tracks,
            images: { url: item.images[1].url },
            uri: item.uri,
          });
        });
        setAlbumData({ show: true, data: transformedData });
      });
    }

    if (activeTab === "tracks") {
      if (userSavedTracks.length === 0) {
        setTracksData({ show: false, data: [] });
        return;
      }
      spotifyApiCtx.getTracks(userSavedTracks).then((res) => {
        const transformedData: TrackType[] = [];
        res.body.tracks.map((item) => {
          transformedData.push({
            name: item.name,
            id: item.id,
            type: item.type,
            uri: item.uri,
            artists: item.artists,
            image: { url: item.album.images[1].url },
          });
        });
        setTracksData({ show: true, data: transformedData });
      });
    }
  }, [
    accessToken,
    spotifyApiCtx,
    activeTab,
    userSavedTracks,
    userSavedAlbums,
    loading,
  ]);
  return (
    <section className={styles.library}>
      {activeTab === "playlists" && (
        <UserPlaylist
          item={playlistData}
          path="playlist"
          heading="my playlists"
        />
      )}

      {activeTab === "albums" && (
        <UserPlaylist item={albumData} path="album" heading="my albums" />
      )}
      {activeTab === "tracks" && <SavedTracks item={tracksData} />}
    </section>
  );
};

export default index;

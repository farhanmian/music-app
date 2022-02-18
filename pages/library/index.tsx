import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SavedTracks from "../../components/app/library/SavedTracks/SavedTracks";
import UserPlaylist from "../../components/app/library/UserPlaylist/UserPlaylist";
import { useAppContext } from "../../store/context/appContext";
import { LibraryPlaylistType, TrackType } from "../../store/types/types";
import styles from "../../styles/Library.module.css";

const index = () => {
  const { accessToken, spotifyApiCtx } = useAppContext();
  const router = useRouter();
  const activeTab = router.query.tab;
  const [playlistData, setPlaylistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [tracksData, setTracksData] = useState([]);

  useEffect(() => {
    activeTab === undefined && router.replace("/library/?tab=playlists");

    if (!accessToken || !spotifyApiCtx) return;

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
          });
        });
        setPlaylistData(transformedData);
      });
    }
    if (activeTab === "albums") {
      spotifyApiCtx.getMySavedAlbums().then((res) => {
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

    if (activeTab === "tracks") {
      spotifyApiCtx.getMySavedTracks().then((res) => {
        const transformedData: TrackType[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.track.name,
            id: item.track.id,
            type: item.track.type,
            uri: item.track.uri,
            artists: item.track.artists,
            image: { url: item.track.album.images[1].url },
          });
        });
        setTracksData(transformedData);
      });
    }
  }, [accessToken, spotifyApiCtx, activeTab]);

  return (
    <section className={styles.library}>
      {activeTab === "playlists" && (
        <UserPlaylist
          data={playlistData}
          path="playlist"
          heading="my playlists"
        />
      )}
      {activeTab === "albums" && (
        <UserPlaylist data={albumData} path="album" heading="my albums" />
      )}
      {activeTab === "tracks" && <SavedTracks data={tracksData} />}
    </section>
  );
};

export default index;

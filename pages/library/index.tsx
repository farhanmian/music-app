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
  const [playlistData, setPlaylistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [tracksData, setTracksData] = useState([]);

  useEffect(() => {
    if (router.asPath === "/library") {
      router.replace("library/?tab=playlists");
    }

    if (
      !accessToken ||
      !spotifyApiCtx ||
      userSavedTracks.length === 0 ||
      userSavedAlbums.length === 0
    )
      return;

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
        setPlaylistData(transformedData);
      });
    }
    if (activeTab === "albums") {
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
        setAlbumData(transformedData);
      });
    }

    if (activeTab === "tracks") {
      spotifyApiCtx.getTracks(userSavedTracks).then((res) => {
        console.log(res);
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
        setTracksData(transformedData);
      });
    }
  }, [accessToken, spotifyApiCtx, activeTab, userSavedTracks, userSavedAlbums]);

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

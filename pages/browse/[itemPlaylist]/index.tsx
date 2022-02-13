import React, { useEffect, useState } from "react";
import styles from "../../../styles/ItemPlaylist.module.css";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../../store/context/appContext";
import { Tracks } from "../../../store/types/types";
import GenresPlaylist from "../../../components/app/browse/Genres/GenresPlaylist/GenresPlaylist";
import Playlist from "../../../components/partials/Playlist/Playlist";

export default function index() {
  const router = useRouter();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const itemQuery = `${router.query.itemPlaylist}`;
  const query = itemQuery.split("-").pop();
  console.log(itemQuery);
  console.log(query);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    // album
    if (itemQuery.includes("album")) {
      // getting album info
      spotifyApiCtx.getAlbum(query).then((res) => {
        setPlaylistInfo({
          name: res.body.name,
          label: res.body.label,
          type: res.body.type,
          images: { url: res.body.images[1].url },
          totalTracks: res.body.total_tracks,
        });
      });

      // getting tracks
      spotifyApiCtx.getAlbumTracks(query).then((res) => {
        console.log(res);
        const transformedData: Tracks[] = [];
        res.body.items.map((track) => {
          transformedData.push({
            artist: { name: track.artists[0].name, id: track.artists[0].id },
            name: track.name,
            id: track.id,
            type: track.type,
            uri: track.uri,
          });
        });
        setTracks(transformedData);
      });
    }

    // shows
    if (itemQuery.includes("podcast")) {
      // get show episodes
      spotifyApiCtx.getShow(query).then((res) => {
        console.log(res);
        setPlaylistInfo({
          name: res.body.name,
          images: { url: res.body.images[1].url },
          label: res.body.description,
          totalTracks: res.body.total_episodes,
          type: res.body.type,
          artist: { name: res.body.publisher },
        });
      });

      spotifyApiCtx.getShowEpisodes(query, { limit: 50 }).then((res) => {
        console.log(res.body.items);
        const transformedData: Tracks[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.name,
            id: item.id,
            type: item.type,
            uri: item.uri,
            artist: { name: null, id: null },
          });
        });
        setTracks(transformedData);
      });
    }

    // featured episodes
    if (itemQuery.includes("featuredepisode")) {
      spotifyApiCtx.getPlaylist(query).then((res) => {
        console.log(res);
        setPlaylistInfo({
          images: { url: res.body.images[0].url },
          name: res.body.name,
          type: res.body.type,
          uri: res.body.uri,
          label: res.body.description,
          artist: { name: null, id: null },
        });
      });

      spotifyApiCtx.getPlaylistTracks(query).then((res) => {
        const transformedData: Tracks[] = [];
        res.body.items.map((item) => {
          transformedData.push({
            name: item.track.name,
            id: item.track.id,
            type: item.track.type,
            artist: {
              name: `${item.track.artists[0].name}`,
              id: item.track.artists[0].id,
            },
            uri: item.track.uri,
          });
        });
        setTracks(transformedData);
      });
    }
  }, [accessToken, spotifyApiCtx]);

  return (
    <section className={styles.itemPlaylist}>
      {itemQuery.includes("category") && <GenresPlaylist query={query} />}
      {itemQuery.includes("album") && (
        <Playlist playlist={playlistInfo} tracks={tracks} />
      )}
      {itemQuery.includes("podcast") && (
        <Playlist playlist={playlistInfo} tracks={tracks} />
      )}
      {itemQuery.includes("featuredepisode") && (
        <Playlist playlist={playlistInfo} tracks={tracks} />
      )}
    </section>
  );
}

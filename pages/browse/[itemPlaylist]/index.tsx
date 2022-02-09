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

    if (!itemQuery.includes("album")) return;
    // getting album info
    spotifyApiCtx.getAlbum(query).then((res) => {
      console.log(res);
      setPlaylistInfo({
        name: res.body.name,
        label: res.body.label,
        type: res.body.type,
        images: { url: res.body.images[1].url },
        artist: {
          name: res.body.artists[0].name,
          id: res.body.artists[0].id,
        },
        totalTracks: res.body.total_tracks,
      });
    });

    // getting tracks
    spotifyApiCtx.getAlbumTracks(query).then((res) => {
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
  }, [accessToken, spotifyApiCtx]);

  return (
    <section className={styles.itemPlaylist}>
      {itemQuery.includes("category") && <GenresPlaylist query={query} />}
      {itemQuery.includes("album") && (
        <Playlist playlist={playlistInfo} tracks={tracks} />
      )}
    </section>
  );
}

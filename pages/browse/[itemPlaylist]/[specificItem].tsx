import React, { useEffect, useState } from "react";
import styles from "../../../styles/SpecificItem.module.css";
import Playlist from "../../../components/partials/Playlist/Playlist";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../../store/context/appContext";
import { Tracks } from "../../../store/types/types";

export default function specificItem() {
  const router = useRouter();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const id = router.query.specificItem;
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx.getPlaylist(id).then((res) => {
      console.log(res);
      setPlaylistInfo({
        name: res.body.name,
        label: res.body.description,
        type: res.body.type,
        images: { url: res.body.images[0].url },
        totalTracks: res.body.tracks.items.length,
      });
    });

    spotifyApiCtx.getPlaylistTracks(id).then((res) => {
      console.log(res);
      const transformedData: Tracks[] = [];
      res.body.items.map((item) => {
        transformedData.push({
          name: item.track.name,
          type: item.track.type,
          id: item.track.id,
          uri: item.track.uri,
          artist: {
            name: item.track.artists[0].name,
            id: item.track.artists[0].id,
          },
        });
      });
      setTracks(transformedData);
    });
  }, [accessToken, spotifyApiCtx]);

  return (
    <section className={styles.specificItem}>
      <Playlist playlist={playlistInfo} tracks={tracks} />
    </section>
  );
}

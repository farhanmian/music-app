import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

import { Tracks } from "../../store/types/types";
import Playlist from "../../components/partials/Playlist/Playlist";
import { useAppContext } from "../../store/context/appContext";

export default function playlist() {
  const router = useRouter();
  const id = router.query.album;
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx.getAlbum(id).then((res) => {
      setPlaylist({
        name: res.body.name,
        label: res.body.label,
        type: res.body.type,
        images: { url: res.body.images[1].url },
        totalTracks: res.body.total_tracks,
        uri: res.body.uri,
      });
    });

    // getting tracks
    spotifyApiCtx.getAlbumTracks(id).then((res) => {
      console.log(res);
      const transformedData: Tracks[] = [];
      res.body.items.map((track) => {
        transformedData.push({
          artists: track.artists,
          name: track.name,
          id: track.id,
          type: track.type,
          uri: track.uri,
        });
      });
      setTracks(transformedData);
    });
  }, [accessToken, spotifyApiCtx]);
  console.log(id);

  return (
    <section style={{ marginTop: 148 }}>
      <Playlist playlist={playlist} tracks={tracks} />
    </section>
  );
}

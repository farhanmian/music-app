import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../store/context/appContext";
import { Tracks } from "../../store/types/types";
import Playlist from "../../components/partials/Playlist/Playlist";

export default function playlist() {
  const router = useRouter();
  const id = router.query.playlist;
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx || !id) return;

    spotifyApiCtx.getPlaylist(id).then((res) => {
      // console.log(res);
      setPlaylist({
        name: res.body.name,
        label: res.body.description,
        type: res.body.type,
        images: { url: res.body.images[0].url },
        totalTracks: res.body.tracks.items.length,
        uri: res.body.uri,
      });
    });

    spotifyApiCtx.getPlaylistTracks(id).then((res) => {
      console.log(res);
      const transformedData: Tracks[] = [];
      res.body.items.map((item) => {
        transformedData.push({
          name: item.track?.name,
          type: item.track?.type,
          id: item.track?.id,
          uri: item.track?.uri,
          artists: item.track?.artists,
          albumName: item.track.album.name,
        });
      });
      setTracks(transformedData);
    });
  }, [accessToken, spotifyApiCtx, id]);

  return (
    <section style={{ marginTop: 148 }}>
      <Playlist playlist={playlist} tracks={tracks} />
    </section>
  );
}

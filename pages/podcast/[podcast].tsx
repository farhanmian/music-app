import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../store/context/appContext";
import { Tracks } from "../../store/types/types";
import Playlist from "../../components/partials/Playlist/Playlist";

export default function playlist() {
  const router = useRouter();
  const id = router.query.podcast;
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    // shows
    // get show episodes
    spotifyApiCtx.getShow(id).then((res) => {
      console.log(res);
      setPlaylist({
        name: res.body.name,
        images: { url: res.body.images[1].url },
        label: res.body.description,
        totalTracks: res.body.total_episodes,
        type: res.body.type,
        artists: [{ name: res.body.publisher }],
      });
    });

    spotifyApiCtx.getShowEpisodes(id, { limit: 50 }).then((res) => {
      console.log(res.body.items);
      const transformedData: Tracks[] = [];
      res.body.items.map((item) => {
        transformedData.push({
          name: item.name,
          id: item.id,
          type: item.type,
          uri: item.uri,
          artists: null,
        });
      });
      setTracks(transformedData);
    });
  }, [accessToken, spotifyApiCtx]);

  return (
    <section style={{ marginTop: 148 }}>
      <Playlist playlist={playlist} tracks={tracks} />
    </section>
  );
}

import React, { useEffect, useState } from "react";
import Playlist from "../../../components/partials/Playlist/Playlist";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../../store/context/appContext";

export default function specificItem() {
  const router = useRouter();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const id = router.query.specificItem;
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx.getPlaylistTracks(id).then((res) => {
      console.log(res);
    });
  }, [accessToken, spotifyApiCtx]);

  return <div>hello</div>;
}

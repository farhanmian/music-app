import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

const artist = () => {
  const router = useRouter();
  const id = router.query.artist;
  console.log(id);

  //   useEffect(()=> {

  //   }, [])

  return <div>artist</div>;
};

export default artist;

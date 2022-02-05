export type Categories = {
  icons: [{ url: string; height: number }];
  name: string;
  id: string;
};

export type NewReleaseItem = {
  type: string;
  name: string;
  images: { url: string };
  id: string;
  artists: { name: string; id: string };
};

/// GetSeveralShows(podcast)
export type PodCastItem = {
  id: string;
  images: { url: string };
  name: string;
  publisher: string;
  uri: string;
};

// GetFeaturedPlaylists
export type FeaturedEpisode = {
  id: string;
  images: { url: string };
  name: string;
  description: string;
  uri: string;
};

// GetPlaylistsForCategory

export type CategoryPlaylist = {
  name: string;
  id: string;
  images: { url: string };
  type: string;
};

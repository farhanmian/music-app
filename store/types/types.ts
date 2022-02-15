export type Categories = {
  icons: [{ url: string; height: number }];
  name: string;
  id: string;
};

export type NewReleaseItemType = {
  id: string;
  image: { url: string };
  name: string;
  artists: { name: string; id: string }[];
  type: string;
};

/// GetSeveralShows(podcast)
export type PodCastItemType = {
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

// Tracks

export type Tracks = {
  artists: { name: string; id: string }[];
  id: string;
  name: string;
  type: string;
  uri: string;
};

// Track Type
export type TrackType = {
  artists: { name: string; id: string }[];
  id: string;
  name: string;
  type: string;
  uri: string;
  image: { url: string };
};

// search result track type
export type SearchTrackType = {
  name: string;
  id: string;
  uri: string;
  type: string;
  artists: { id: string; name: string }[];
  image: { url: string };
};

/// Playlist

export type PlaylistType = {
  artists: { name: string }[];
  images: { url: string };
  label: string;
  name: string;
  totalTracks: number;
  type: string;
  uri: string;
};

/// artist
export type ArtistType = {
  name: string;
  id: string;
  images: { url: string };
  type: string;
  popularity: number;
};

// libraryPlaylist

export type LibraryPlaylistType = {
  name: string;
  id: string;
  type: string;
  images: { url: string };
  noOfSongs: number;
};

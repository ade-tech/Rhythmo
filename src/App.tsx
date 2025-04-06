import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import Home from "./components/ui/Home";
import TrackContainer from "./features/tracks/TrackContainer";
import AlbumContainer from "./features/albums/AlbumContainer";
import PlaylistContainer from "./features/playlist/PlaylistContainer";
import ArtistContainer from "./features/artist/ArtistContainer";
import GenreContainer from "./features/genre/GenreContainer";
import TrendingContainer from "./components/ui/TrendingContainer";
import ProfileContainer from "./features/user/profile/ProfileContainer";
import { AudioContextProvider } from "./contexts/audioContext";
import OpenSongProvider from "./contexts/songContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioContextProvider>
        <OpenSongProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<TrendingContainer />} />
              <Route path="track/:id" element={<TrackContainer />} />
              <Route path="album/:id" element={<AlbumContainer />} />
              <Route path="playlist/:id" element={<PlaylistContainer />} />
              <Route path="artist/:id" element={<ArtistContainer />} />
              <Route path="search" element={<GenreContainer />} />
              <Route path="genre/:id" element={<GenreContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
            </Route>
          </Routes>
        </OpenSongProvider>
      </AudioContextProvider>
    </QueryClientProvider>
  );
}

export default App;

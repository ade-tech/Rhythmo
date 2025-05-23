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
import ArtistLoginContainer from "./features/auth/ArtistLoginContainer";
import UserOnboarding from "./features/Onboarding/UserOnboarding";
import { CurrentUserProvider } from "./contexts/currentUserContext";
import { Toaster } from "./components/ui/toaster";
import UserLoginContainer from "./features/auth/UserLoginContainer";
import PageNotFound from "./components/ui/PageNotFound";
import ArtistOnboarding from "./features/Onboarding/ArtistOnboarding";
import ArtistProtectedRoute from "./components/ui/ArtistProtectedRoute";

import ArtistLayout from "./components/ui/ArtistLayout";
import ArtistDashboard from "./features/artist/ArtistDashboard";
import { CurrentArtistProvider } from "./contexts/currentArtistContext";
import ArtistHome from "./features/artist/ArtistHome";

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
      <Toaster />
      <CurrentUserProvider>
        <CurrentArtistProvider>
          <OpenSongProvider>
            <AudioContextProvider>
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
                <Route path="/login" element={<UserLoginContainer />} />

                <Route path="/user/onboard" element={<UserOnboarding />} />

                <Route path="/artist" element={<ArtistLayout />}>
                  <Route
                    element={
                      <ArtistProtectedRoute>
                        <ArtistHome />
                      </ArtistProtectedRoute>
                    }
                  >
                    <Route index element={<ArtistDashboard />} />
                  </Route>
                  <Route path="login" element={<ArtistLoginContainer />} />
                  <Route path="onboard" element={<ArtistOnboarding />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </AudioContextProvider>
          </OpenSongProvider>
        </CurrentArtistProvider>
      </CurrentUserProvider>
    </QueryClientProvider>
  );
}

export default App;

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes } from "react-router-dom";
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
import ArtistStat from "./features/artist/ArtistStat";
import CreateMusic from "./features/artist/CreateMusic";
import ArtistSongs from "./features/artist/ArtistSongs";
import ArtistRevenue from "./features/artist/ArtistRevenue";
import ArtistSettings from "./features/artist/ArtistSettings";

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
                  <Route path="artists/:id" element={<ArtistContainer />} />
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
                    <Route
                      index
                      element={<Navigate to={"/artist/dashboard"} />}
                    />
                    <Route
                      path="/artist/dashboard"
                      element={<ArtistDashboard />}
                    />
                    <Route path="/artist/statistics" element={<ArtistStat />} />
                    <Route path="/artist/create" element={<CreateMusic />} />

                    <Route path="/artist/*" element={<PageNotFound />} />
                    <Route path="/artist/tracks" element={<ArtistSongs />} />
                    <Route path="/artist/revenue" element={<ArtistRevenue />} />
                    <Route
                      path="/artist/settings"
                      element={<ArtistSettings />}
                    />
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

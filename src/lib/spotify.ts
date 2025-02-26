import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const redirectUri = 'http://localhost:3000';

export const spotify = SpotifyApi.withUserAuthorization(
  clientId,
  redirectUri,
  ['streaming', 'user-read-playback-state'] // Reduced permissions
);
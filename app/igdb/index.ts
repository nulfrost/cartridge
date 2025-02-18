import { env } from "#/app/env";
import { ofetch } from "ofetch";

async function getIGDBAccessToken() {
  const response = await ofetch<{
    access_token: string;
    expires_in: number;
    token_type: string;
  }>(
    `https://id.twitch.tv/oauth2/token?client_id=${env.IGDB_API_CLIENT_ID}&client_secret=${env.IGDB_API_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: "POST",
    }
  );

  return response.access_token;
}

export const igdb = ofetch.create({
  baseURL: "https://api.igdb.com/v4",
  async onRequest({ options }) {
    options.headers.set("Client-ID", env.IGDB_API_CLIENT_ID);
    // if for some reason the token is not already set, set one
    if (!options.headers.has("Authorization")) {
      options.headers.set(
        "Authorization",
        `Bearer ${await getIGDBAccessToken()}`
      );
    }
  },
  async onResponse({ response, options }) {
    // refresh the token when it expires
    if (response.status === 401) {
      options.headers.set(
        "Authorization",
        `Bearer ${await getIGDBAccessToken()}`
      );
    }
  },
  retry: 2,
  retryDelay: 2000,
  ignoreResponseError: true,
});

import { createCookieSessionStorage } from "react-router";

type SessionData = {
  did: string;
};

type SessionFlashData = {
  error: string;
};

const { commitSession, getSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__cartridge_session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      secrets: [process.env.SESSION_SECRET!],
      secure: import.meta.env.PROD,
    },
  });

export { commitSession, getSession, destroySession };

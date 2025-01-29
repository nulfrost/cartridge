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
			name: "__bloc_session",
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			maxAge: 60 * 60,
			secrets: [process.env.SESSION_SECRET!],
		},
	});

export { commitSession, getSession, destroySession };

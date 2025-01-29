import type {
	NodeSavedSession,
	NodeSavedSessionStore,
	NodeSavedState,
	NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import type { PrismaClient } from "@prisma/client";

export class StateStore implements NodeSavedStateStore {
	constructor(private db: PrismaClient) {}
	async get(key: string): Promise<NodeSavedState | undefined> {
		const result = await this.db.state.findFirst({
			where: {
				key,
			},
		});
		if (!result) return;
		return JSON.parse(result.state) as NodeSavedState;
	}
	async set(key: string, value: NodeSavedState) {
		const state = JSON.stringify(value);

		await this.db.state.upsert({
			where: {
				key,
			},
			update: {
				state,
			},
			create: {
				key,
				state,
			},
		});
	}
	async del(key: string) {
		await this.db.state.delete({
			where: {
				key,
			},
		});
	}
}

export class SessionStore implements NodeSavedSessionStore {
	constructor(private db: PrismaClient) {}
	async get(key: string): Promise<NodeSavedSession | undefined> {
		const result = await this.db.session.findFirst({
			where: {
				key,
			},
		});
		if (!result) return;
		return JSON.parse(result.session) as NodeSavedSession;
	}
	async set(key: string, value: NodeSavedSession) {
		const session = JSON.stringify(value);
		await this.db.session.upsert({
			where: {
				key,
			},
			update: {
				session,
			},
			create: {
				key,
				session,
			},
		});
	}
	async del(key: string) {
		await this.db.session.delete({
			where: {
				key,
			},
		});
	}
}

import { z } from "zod";

export const GameSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
		genres: z.array(
			z.object({
				checksum: z.string(),
				created_at: z.number(),
				id: z.number(),
				name: z.string(),
				slug: z.string(),
				upated_at: z.number(),
				url: z.string(),
			}),
		),
		first_release_date: z.number(),
		cover: z.object({
			alpha_channel: z.boolean(),
			animated: z.boolean(),
			checksum: z.string(),
			game: z.number(),
			height: z.number(),
			width: z.number(),
			id: z.number(),
			image_id: z.string(),
			url: z.string(),
		}),
		artworks: z.optional(
			z.array(
				z.object({
					alpha_channel: z.boolean(),
					animated: z.boolean(),
					checksum: z.string(),
					game: z.number(),
					height: z.number(),
					width: z.number(),
					id: z.number(),
					image_id: z.string(),
					url: z.string(),
				}),
			),
		),
	}),
);
export type Game = z.infer<typeof GameSchema>;

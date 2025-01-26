import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = remember(
	"prisma",
	() => new PrismaClient(),
);

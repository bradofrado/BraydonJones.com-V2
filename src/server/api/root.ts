import { createTRPCRouter } from "~/server/api/trpc";
import {experienceRouter} from '~/server/api/routers/experience';
import { projectRouter } from "./routers/project";
import { aboutRouter } from "./routers/about";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  experience: experienceRouter,
  project: projectRouter,
  about: aboutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { AboutItem } from "~/utils/types/about";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const aboutRouter = createTRPCRouter({
    getAbout: publicProcedure
        .query(({ctx}) => {
            return aboutItem;
        })
});

const aboutItem: AboutItem = {
    description: 'In 2014 when I was 14, I read my first book on programming and fell in love. Since then, I\'ve worked on projects ranging from Unity 3D games to websites made completely from scratch.'
}
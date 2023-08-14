import { AboutItem } from "~/utils/types/about";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { experienceItems } from "./experience";
import { projectItems } from "./project";
import { BaseItem } from "~/utils/types/base";

export const aboutRouter = createTRPCRouter({
    getAbout: publicProcedure
        .query(({ctx}) => {
            return getAboutItem();
        }),
    getSkills: publicProcedure
        .query(({ctx}) => {
            const reducer = (prev: Set<string>, curr: BaseItem): Set<string> => {
                for (const tag of curr.tags) {
                    prev.add(tag);
                }

                return prev;
            }
            const skills = new Set([...experienceItems.reduce(reducer, new Set()), ...projectItems.reduce(reducer, new Set())]);

            return Array.from(skills).sort((a, b) => a.localeCompare(b));
        })
});

const getAboutItem = (): AboutItem => {
    return {
        descriptions: ['In 2014 when I was in middle school, I read my first book on programming and instantly loved it. Since then, I\'ve worked on various projects ranging from Unity 3D games to websites made completely from scratch.', 
            `I\'ve had many opportunites in my ${new Date().getFullYear() - 2014} years of programming experience to learn various frameworks and languages. Since most of this experience is self-taught, I feel confident that any problem I haven't already come across I can figure out!`],
        attachments: [
            // {
            //     label: 'Resume',
            //     link: ''
            // }
        ]
    };
}
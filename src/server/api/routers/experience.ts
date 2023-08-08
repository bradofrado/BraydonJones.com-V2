import { ExperienceItem } from "~/utils/types/experience";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
    getExperienceItems: publicProcedure
        .query(({ctx}) => {
            return experienceItems;
        })
});

const experienceItems: ExperienceItem[] = [
    {
        dates: {
        start: new Date(),
        end: null
        },
        company: 'Lucid Software',
        title: 'Software Engineer Intern',
        description: 'Lead teams of people',
        tags: ['CSS', 'Angular', 'Typescript'],
        link: 'https://lucid.co'
    }
]
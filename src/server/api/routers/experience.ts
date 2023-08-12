import { ExperienceItem } from "~/utils/types/experience";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
    getExperienceItems: publicProcedure
        .query(({ctx}) => {
            return experienceItems.sort((a, b) => b.dates.start.getTime() - a.dates.start.getTime());
        })
});

const experienceItems: ExperienceItem[] = [
    {
        dates: {
            start: new Date(2023, 4, 15),
            end: null
        },
        company: 'Lucid Software',
        title: 'Software Engineer Intern',
        description: 'Help release new product features as a full contributing member of Team Spaces',
        tags: ['Angular', 'Typescript', 'CSS', 'LESS', 'Scala'],
        link: 'https://lucid.co'
    },
    {
        dates: {
            start: new Date(2022, 0, 1),
            end: new Date(2023, 4, 14)
        },
        company: 'Mapline',
        title: 'Junior Full Stack Developer',
        description: 'Completed 74 user stories as the only part time developer in 2022. Ranked top 3 among 25+ developers in new features added.',
        tags: ['Javascript', 'Jquery', 'CSS', 'SQL', 'C#', 'Subversion'],
        link: 'https://mapline.com'
    },
    {
        dates: {
            start: new Date(2020, 10, 1),
            end: new Date(2022, 0, 1)
        },
        company: 'AJs Palette',
        title: 'Full Stack Developer',
        description: 'Created from scratch custom artwork website AJsPalette.com. Allows customers the ability to be their own artists creating work using AJ\'s Palette.',
        tags: ['React', 'CSS', 'C#', 'Azure DevOps'],
        link: 'https://ajspalette.com'
    },
    {
        dates: {
            start: new Date(2018, 6, 1),
            end: new Date(2018, 8, 1)
        },
        company: 'The Void',
        title: 'Rig Assembler',
        description: 'Assembled 200 virtual reality hardware rigs containing Oculus controllers and windows backtops. Tested these rigs for quality and packaged them to be sent to various locations.',
        tags: ['Windows OS'],
        link: 'https://lucid.co'
    },
]
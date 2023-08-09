import { ProjectItem } from "~/utils/types/project";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    getProjectItems: publicProcedure
        .query(({ctx}) => {
            return projectItems;
        })
})

const projectItems: ProjectItem[] = [
    {
      title: 'Running Sons',
      description: 'Made a website for my band',
      tags: ['CSS', 'Angular', 'Typescript'],
      image: '/65837300a442e99a5c5113d4ff548b87.png',
      link: 'https://runningsons.com'
    },
    {
        title: 'Running Sons',
        description: 'Made a website for my band',
        tags: ['CSS', 'Angular', 'Typescript'],
        image: '/65837300a442e99a5c5113d4ff548b87.png',
        link: 'https://runningsons.com'
    },
    {
        title: 'Running Sons',
        description: 'Made a website for my band',
        tags: ['CSS', 'Angular', 'Typescript'],
        image: '/65837300a442e99a5c5113d4ff548b87.png',
        link: 'https://runningsons.com'
    },
    {
        title: 'Running Sons',
        description: 'Made a website for my band',
        tags: ['CSS', 'Angular', 'Typescript'],
        image: '/65837300a442e99a5c5113d4ff548b87.png',
        link: 'https://runningsons.com'
    },
    {
        title: 'Running Sons',
        description: 'Made a website for my band',
        tags: ['CSS', 'Angular', 'Typescript'],
        image: '/65837300a442e99a5c5113d4ff548b87.png',
        link: 'https://runningsons.com'
    },
]
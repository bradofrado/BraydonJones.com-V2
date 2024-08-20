import { ExperienceItem } from "~/utils/types/experience";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
    getExperienceItems: publicProcedure
        .query(({ctx}) => {
            return experienceItems.sort((a, b) => {
                if (a.dates.end === null) return -1
                if (b.dates.end === null) return 1
                return b.dates.start.getTime() - a.dates.start.getTime()
        });
        })
});

export const experienceItems: ExperienceItem[] = [
    {
        dates: {
            start: new Date(2024, 0, 1),
            end: null
        },
        company: 'Harmony UI',
        title: 'Co-founder and CTO',
        description: 'Founded a business that allows designers to make UI edits to a code-based application, shipping changes without a developer. Solely create the end-to-end system that goes from a no-code update to the respective change in a dynamic codebase. Play a significant role in making strategic business decisions, talking to investors, and onboarding customers.',
        tags: ['NextJS', 'React', 'Typescript', 'NPM', 'Chrome Extension', 'Fly.io', 'Postgres', 'Prisma', 'Vercel'],
        attachments: [],
        link: 'https://harmonyui.app'
    },
    {
        dates: {
            start: new Date(2024, 4, 1),
            end: new Date(2024, 7, 1)
        },
        company: 'Pattern',
        title: 'Software Engineer Intern',
        description: 'Implement Content Brief PDF download including creating a new AWS ECS service and PDF generation repository. Play a significant role in the migration of Pattern’s product PXM from older technology to NextJs and NX monorepo with 132 pull requests. Update PXM’s UI to match the styling and functionality of other Pattern products.',
        tags: ['React', 'Typescript', 'NextJS', 'NX', 'AWS ECS', ],
        attachments: [],
        link: 'https://amplifi.io/'
    },
    {
        dates: {
            start: new Date(2023, 7, 1),
            end: new Date(2024, 0, 1)
        },
        company: 'Nexa (Sandbox Cohort 03)',
        title: 'Co-Founder',
        description: 'Built software that centers around streaming lining businesses to businesses communication. Learned new frameworks and coding stacks to iterate quickly on an MVP. Talked with target customers to develop new insight into the problem of information sharing among businesses.',
        tags: ['React', 'Typescript', 'NextJS', 'Postgres', 'Prisma', 'TurboRepo'],
        attachments: [
        ],
        link: 'https://sandbox-project-livid.vercel.app/'
    },
    {
        dates: {
            start: new Date(2023, 4, 15),
            end: new Date(2023, 7, 31)
        },
        company: 'Lucid Software',
        title: 'Software Engineer Intern',
        description: 'Help release new product features as a full contributing member of Team Spaces',
        tags: ['Angular', 'Typescript', 'CSS', 'LESS', 'Scala'],
        attachments: [
            {
                label: 'Showcase',
                link: 'https://lucid.app/lucidspark/154d22fc-a1f3-44af-9b37-ed79e02fb60c/edit?viewport_loc=-4637%2C-1469%2C11550%2C6125%2C0_0&invitationId=inv_a889c8e1-768d-435b-940f-52c98f12b73a'
            }
        ],
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
        tags: ['HTML', 'Javascript', 'Jquery', 'CSS', 'SQL', 'C#', 'Subversion'],
        attachments: [
            // {
            //     label: 'Dynamic Messaging',
            //     link: 'https://mapline.com/updates-july-2023/#:~:text=DYNAMIC%20MESSAGING%20IS%20HERE!'
            // },
            // {
            //     label: 'Form Search',
            //     link: 'https://mapline.com/updates-may-2023/#:~:text=SKYROCKET%20YOUR%20FORMS'
            // }
        ],
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
        tags: ['React', 'HTML', 'CSS', 'C#', 'Azure DevOps'],
        attachments: [],
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
        attachments: [],
        link: 'https://lucid.co'
    },
]
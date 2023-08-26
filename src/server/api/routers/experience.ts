import { ExperienceItem } from "~/utils/types/experience";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
    getExperienceItems: publicProcedure
        .query(({ctx}) => {
            return experienceItems.sort((a, b) => b.dates.start.getTime() - a.dates.start.getTime());
        })
});

export const experienceItems: ExperienceItem[] = [
    {
        dates: {
            start: new Date(2023, 4, 15),
            end: null
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
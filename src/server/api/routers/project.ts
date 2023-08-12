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
      description: 'Online shopping/events website for the band Running Sons. I am the keyboardist in this band.',
      tags: ['Vue', 'CSS', 'Node.js', 'Express'],
      attachments: [
        {
            label: 'Github',
            link: 'https://github.com/bradofrado/RunningSons'
        }
      ],
      image: '/65837300a442e99a5c5113d4ff548b87.png',
      link: 'https://runningsons.com'
    },
    {
        title: 'Witnesses of the Restoration',
        description: 'Website highlighting important events in the Restoration of the Church of Jesus Christ of Latter-day Saints categorized in a singular timeline.',
        tags: ['React', 'Typescript', 'Next.js', 'Tailwind CSS'],
        attachments: [
            {
                label: 'Github',
                link: 'https://github.com/bradofrado/RestorationProject'
            }
        ],
        image: '/38d0fc4793d80d8e04f6f1fcd882efdf.png',
        link: 'https://witnessesoftherestoration.com'
    },
    {
        title: 'Sowards Suites',
        description: 'Webiste storing a centralized location for booking rooms in the Sowards household, alliviating the burden put on Momma Llamma',
        tags: ['Vue', 'CSS', 'Node.js', 'Express'],
        attachments: [
            {
                label: 'Github',
                link: 'https://github.com/bradofrado/SowardsSuites'
            }
        ],
        image: '/bf6f7a74b471c7d1d489a804e92013dd.png',
        link: 'https://sowardssuites.com'
    },
    {
        title: 'Braydon Jones',
        description: 'Online portfolio for the great and powerful Braydon Jones, highlighting his experience and personal projects he has had in software developement.',
        tags: ['React', 'Typescript', 'Next.js', 'Tailwind CSS'],
        attachments: [
            {
                label: 'Github',
                link: 'https://github.com/bradofrado/BraydonJones.com'
            }
        ],
        image: '/braydon-piano.JPG',
        link: 'https://runningsons.com'
    },
    {
        title: 'Broski',
        description: 'BYU Sandbox 2022 hackathon project. Provides  a community, air bnb like experience to selling and renting outdoor equipment.',
        tags: ['React', 'Javascript', 'Node.js', 'Express'],
        attachments: [
            {
                label: 'Github',
                link: 'https://github.com/tadrosenberg/broski'
            }
        ],
        image: '/3b7ced70b1ac2bef934ea2323c97144f.png',
        link: 'https://broski.braydonjones.com'
    },
    {
        title: 'FBLA Computer Game and Simulation Programming Nationals 4th Place',
        description: 'In 2018, I completed in FBLA Computer Game and Simulation Programming and got 4th place overall at Nationals in Baltimore. The task was to make a sandbox style game that was the \'Day in the Life of an FBLA student\'.',
        tags: ['Unity', 'C#'],
        attachments: [
            {
                label: 'FBLA Game Installer',
                link: 'https://drive.google.com/drive/folders/1ABuctdmwaW3ZfBkKWrU0cBxwDAEAeqDf'
            },
        ],
        image: '/6020df6517475dc6572939e01addfb9d.png',
        link: 'https://youtu.be/YXhxi3gJyJY?t=3676'
    },
    {
        title: 'Other Projects',
        description: 'Check out some of the other projects I worked on in middle school and high school. Included is a sudoku solver/game, family economy app for managing the family\'s chores and allowance, and a \'Virus\'--use at your own risk :)',
        tags: ['Unity', 'Windows Forms', 'C#'],
        attachments: [],
        image: '/unity.png',
        link: 'https://drive.google.com/drive/folders/1jsHOmqPAWp1g-KB0P568hM5io7kOh0s8?usp=sharing'
    }
]
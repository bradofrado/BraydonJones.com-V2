import { ExperienceItem } from "~/utils/types/experience"
import { ExperienceCard } from "./experience-card"

export type ExperienceListProps = {
    items: ExperienceItem[]
}
export const ExperienceList = ({items}: ExperienceListProps) => {
    return <>
        <ul>
            {items.map((item, i) => <li key={i}>
                <ExperienceCard item={item}/>
            </li>)}
        </ul>
    </>
}

export const ExperienceDisplay = () => {
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
    return <>
        <ExperienceList items={experienceItems}/>
    </>
}
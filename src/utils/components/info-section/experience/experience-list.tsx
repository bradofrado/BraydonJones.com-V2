import { ExperienceItem } from "~/utils/types/experience"
import { ExperienceCard } from "./experience-card"
import {useGetProjectItems} from '~/utils/services/project';
import { useGetExperienceItems } from "~/utils/services/experience";

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
    const query = useGetExperienceItems();
    if (query.isLoading || query.isError) {
        return <></>
    }
    const items = query.data;
    return <>
        <ExperienceList items={items}/>
    </>
}
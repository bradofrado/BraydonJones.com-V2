import { ProjectItem } from "~/utils/types/project"
import { BaseCard } from "../base/base-card"

export type ProjectCardProps = {
    item: ProjectItem
}
export const ProjectCard = ({item}: ProjectCardProps) => {
    return <>
        <BaseCard title={item.title} description={item.description} link={item.link} tags={item.tags}>
            <img src={item.image}/>
        </BaseCard>
    </>
}
/* eslint-disable @next/next/no-img-element */
import { ProjectItem } from "~/utils/types/project"
import { BaseCard } from "../base-card"

export type ProjectCardProps = {
    item: ProjectItem
}
export const ProjectCard = ({item}: ProjectCardProps) => {
    return <>
        <BaseCard title={item.title} description={item.description} link={item.link} tags={item.tags} attachments={item.attachments}>
            <div className="w-32 h-32">
                <img className="w-full h-full object-cover" src={item.image} alt="alt"/>
            </div>
        </BaseCard>
    </>
}
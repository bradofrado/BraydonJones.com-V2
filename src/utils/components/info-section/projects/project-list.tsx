import {ProjectItem} from '~/utils/types/project';
import {ProjectCard} from '~/utils/components/info-section/projects/project-card';
import Header from '../../base/header';
import { useGetProjectItems } from '~/utils/services/project';
export type ProjectListProps = {
    items: ProjectItem[]
}
export const ProjectList = ({items}: ProjectListProps) => {
    return <>
        <ul>
            {items.map((item, i) => <li key={i}>
                <ProjectCard item={item}/>
            </li>)}
        </ul>
    </>
}

export const ProjectDisplay = () => {
    const query = useGetProjectItems();
    if (query.isLoading || query.isError) {
        return <></>
    }
    const items = query.data;
    
    return <>
        <ProjectList items={items}/>
    </>
}
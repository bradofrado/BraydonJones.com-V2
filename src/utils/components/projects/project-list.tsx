import {ProjectItem} from '~/utils/types/project';
import {ProjectCard} from '~/utils/components/projects/project-card';
import Header from '../base/header';
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
    const ProjectItems: ProjectItem[] = [
        {
          title: 'Running Sons',
          description: 'Made a website for my band',
          tags: ['CSS', 'Angular', 'Typescript'],
          image: 'https://braydonjones.com/images/projects/65837300a442e99a5c5113d4ff548b87',
          link: 'https://runningsons.com'
        }
      ]
    return <>
        <ProjectList items={ProjectItems}/>
    </>
}
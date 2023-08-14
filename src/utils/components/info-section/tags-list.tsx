import {Pill} from '~/utils/components/base/pill';
export type TagListProps = {
    tags: string[]
}
export const TagList = ({tags}: TagListProps) => {
    return <>
        <ul className="flex flex-wrap">
            {tags.map((tag, i) => <Pill key={i} className="mr-1.5 mt-2">{tag}</Pill>)}
        </ul>
    </>
}
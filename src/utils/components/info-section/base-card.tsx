import Header from '~/utils/components/base/header';
import {Pill} from '~/utils/components/base/pill';

export type BaseCardProps = {
    title: string,
    description: string,
    link: string,
    tags: string[]
} & React.PropsWithChildren
export const BaseCard = ({title, description, link, tags, children}: BaseCardProps) => {
    return <>
        <a className="flex cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 p-5 rounded-md" href={link} target="_blank">
            <div className="mr-5 w-32">
                {children}
            </div>
            <div className="flex gap-2 flex-col flex-1">
                <Header className="leading-snug" level={4}>{title}</Header>
                <p className="mt-2 text-sm leading-normal">{description}</p>
                <ul className="flex flex-wrap">
                    {tags.map((tag, i) => <Pill key={i} className="mr-1.5 mt-2">{tag}</Pill>)}
                </ul>
            </div>
        </a>
    </>
}
import Header from '~/utils/components/base/header';
import {Pill} from '~/utils/components/base/pill';
import { LinkItem } from '../base/link-item';
import { AttachmentItem, BaseItem } from '~/utils/types/base';
import { TagList } from './tags-list';

export type BaseCardProps = BaseItem & React.PropsWithChildren
export const BaseCard = ({title, description, link, tags, attachments, children}: BaseCardProps) => {
    return <>
        <a className="flex cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 p-5 rounded-md flex-col md:flex-row" href={link} target="_blank">
            <div className="mr-5 mb-2 md:mb-0">
                {children}
            </div>
            <div className="flex gap-2 flex-col flex-1">
                <Header className="leading-snug" level={4}>{title}</Header>
                <p className="mt-2 text-sm leading-normal">{description}</p>
                {attachments.length > 0 && <ul className="flex flex-wrap">
                    {attachments.map((attachment, i) => <li className="mr-2" key={i}>
                        <LinkItem label={attachment.label} link={attachment.link}/>
                    </li>)}
                </ul>}
                <TagList tags={tags}/>
            </div>
        </a>
    </>
}
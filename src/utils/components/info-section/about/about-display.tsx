import { useGetAbout } from "~/utils/services/about"
import { LinkItem } from "../../base/link-item";

export const AboutDisplay = () => {
    const query = useGetAbout();
    if (query.isLoading || query.isError) {
        return <></>
    }
    const aboutItem = query.data;
    return <>
        <div className="flex flex-col gap-4">
            {aboutItem.descriptions.map((description, i) => <p key={i}>
                {description}
            </p>)}
            <ul className="flex flex-wrap">
                {aboutItem.attachments.length > 0 && aboutItem.attachments.map((attachment, i) => <li key={i} className="mr-2">
                    <LinkItem label={attachment.label} link={attachment.link}/>
                </li>)}
            </ul>
        </div>
    </>
}
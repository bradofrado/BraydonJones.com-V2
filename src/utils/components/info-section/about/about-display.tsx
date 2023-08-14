import { useGetAbout, useGetSkills } from "~/utils/services/about"
import { LinkItem } from "../../base/link-item";
import { Pill } from "../../base/pill";
import { TagList } from "../tags-list";
import { Accordion } from "../../base/accordion";

export const AboutDisplay = () => {
    const query = useGetAbout();
    const skillQuery = useGetSkills();
    if (query.isLoading || query.isError || skillQuery.isLoading || skillQuery.isError) {
        return <></>
    }
    const aboutItem = query.data;
    const skills = skillQuery.data;
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
            <Accordion items={[{label: 'Skills', content: <TagList tags={skills} />}]}/>
        </div>
    </>
}
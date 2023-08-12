import { FacebookIconLink, GithubIconLink, InstagramIconLink, LinkedInIconLink } from "../icons/icon-links";
import { FacebookIcon, GithubIcon, IconComponent, InstagramIcon, LinkedInIcon } from "../icons/icons"

export type FooterProps = {
    className?: string
}
export const Footer = ({className}: FooterProps) => {
    const icons: IconComponent[] = [LinkedInIconLink, GithubIconLink, InstagramIconLink, FacebookIconLink, ];
    return <>
        <div className={`w-full p-8 ${className}`}>
            <div className="flex gap-4">
                {icons.map((Icon, i) => <Icon key={i}/>)}
            </div>
        </div>
    </>
}
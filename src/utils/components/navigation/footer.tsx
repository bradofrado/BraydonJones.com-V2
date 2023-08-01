import { FacebookIconLink, GithubIconLink, InstagramIconLink, LinkedInIconLink } from "../icons/icon-links";
import { FacebookIcon, GithubIcon, IconComponent, InstagramIcon, LinkedInIcon } from "../icons/icons"

export const Footer = () => {
    const icons: IconComponent[] = [LinkedInIconLink, GithubIconLink, InstagramIconLink, FacebookIconLink, ];
    return <>
        <div className="w-full p-8">
            <div className="text-center pt-3 pb-3 text-xs text-[.6rem]">ALL CONTENT COPYRIGHT © {new Date().getFullYear()} Braydon Jones</div>
            <div className="flex justify-center gap-4">
                {icons.map((Icon, i) => <Icon key={i}/>)}
            </div>
        </div>
    </>
}
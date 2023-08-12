import Link from "next/link"
import { FacebookIcon, GithubIcon, IconComponent, InstagramIcon, LinkedInIcon } from "./icons"

export type IconLinkProps = {
    icon: IconComponent,
    href: string
}
export const IconLink = ({icon, href}: IconLinkProps) => {
    const Icon = icon;
    return <>
        <Link href={href} target="_blank">
            <Icon className="w-6 h-6 hover:!fill-slate-500"/>
        </Link>
    </>
}

export const GithubIconLink = () => {
    return <>
        <IconLink icon={GithubIcon} href="https://github.com/bradofrado/"/>
    </>
}

export const InstagramIconLink = () => {
    return <>
        <IconLink icon={InstagramIcon} href="https://www.instagram.com/bradofrado/"/>
    </>
}

export const LinkedInIconLink = () => {
    return <>
        <IconLink icon={LinkedInIcon} href="https://www.linkedin.com/in/braydon-jones-042239217/"/>
    </>
}

export const FacebookIconLink = () => {
    return <>
        <IconLink icon={FacebookIcon} href="https://www.facebook.com/braydon.jones.330/"/>
    </>
}
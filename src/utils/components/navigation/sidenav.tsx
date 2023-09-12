import React, { createRef, useEffect, useRef, useState } from "react"
import Header from "../base/header"
import { Footer } from "./footer"
import { AboutDisplay } from "../info-section/about/about-display"
import { ExperienceDisplay } from "../info-section/experience/experience-list"
import { ProjectDisplay } from "../info-section/projects/project-list"
import { ToggleSwitch } from "../base/toggle-switch"
import { DarkModelToggle } from "../dark-mode/dark-mode-toggle"
import { useGetExperienceItems } from "~/utils/services/experience"

interface NavItem {
    label: string,
    id: string,
    content: React.ReactNode
}

export type SideNavComponentProps = {
    navItems: NavItem[],
    otherItems?: React.ReactNode[],
    className?: string
} & React.PropsWithChildren
export const SideNavComponent = ({children, navItems, otherItems, className}: SideNavComponentProps) => {
    const [activeId, setActiveId] = useState<string | undefined>();
    const refs = navItems.reduce<Record<string, React.RefObject<HTMLSelectElement>>>((refsObj, item) => {
        refsObj[item.id] = createRef<HTMLSelectElement>();
        return refsObj;
    }, {});

    useEffect(() => {
        const observerConfig: IntersectionObserverInit = {
            rootMargin: '0px',
            threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
        const handleIntersection: IntersectionObserverCallback = (entries) => {
            let maxEntry: IntersectionObserverEntry | null = null;
            for (const entry of entries) {
                if (!maxEntry || entry.intersectionRatio > maxEntry.intersectionRatio) {
                    maxEntry = entry;
                }
            }
            if (!maxEntry) return;
            
            if (maxEntry) {
                setActiveId(maxEntry.target.id);
            }
        }
        const observer = new IntersectionObserver(handleIntersection, observerConfig);
        for (let name in refs) {
            const current = refs[name]?.current;
        
            current && observer.observe(current);
        }

        return () => observer.disconnect();
    }, [activeId, setActiveId, refs])

    const onNavItemClick = (item: NavItem) => {
        const ref = refs[item.id];
        if (ref?.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    }
    return <>
        <div className={`flex flex-col md:flex-row ${className || ''}`}>
            <div className="flex-1 flex flex-col md:sticky max-h-screen md:py-24 top-0">
                <div className="flex-1">
                    {children}
                    <ul className="mt-10 flex flex-col gap-4">
                        {navItems.map((item, i)=> {
                            const activeClass = activeId == item.id ? '!text-primary dark:text-primary': 'text-gray-900'
                            return <li key={i}>
                                <a href={`#${item.id}`} className={`rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeClass}`}
                                    onClick={(e) => {e.preventDefault(); onNavItemClick(item)}}>
                                    {item.label}
                                </a>
                            </li>
                        })}
                        {otherItems && otherItems.map((item, i) => <li key={i}>
                            {item}
                        </li>)}
                    </ul>
                </div>
                <Footer className="hidden md:block"/>
            </div>
            <div className="flex-1 pt-8 md:py-24 flex flex-col gap-16">
                {navItems.map((item, i) => <SideNavSection key={i} id={item.id} refObj={refs[item.id] as React.RefObject<HTMLSelectElement>}>
                    {item.content}
                </SideNavSection>)}
                <Footer className="block md:hidden"/>
            </div>
            
        </div>
    </>
}

type SideNavSectionProps = {
    id: string,
    refObj: React.RefObject<HTMLElement>
} & React.PropsWithChildren
const SideNavSection = ({id, children, refObj}: SideNavSectionProps) => {
   
    return <>
        <section id={id} ref={refObj}>
            {children}
        </section>
    </>
}

export type SideNavProps = {
    className?: string
}
export const SideNav = ({className}: SideNavProps) => {
    const query = useGetExperienceItems();
    if (query.isError || query.isLoading) {
        return <></>
    }

    const firstItem = query.data[0];
    if (!firstItem) return <></>

    const items: NavItem[] = [
        {
            label: 'About',
            id: 'about',
            content: <AboutDisplay/>
        },
        {
            label: 'Experience',
            id: 'experience',
            content: <ExperienceDisplay/>
        },
        {
            label: 'Projects',
            id: 'projects',
            content: <ProjectDisplay/>
        }
    ]

	const getSubtitle = () => {
		if (firstItem.dates.end == null) {
			return `${firstItem.title} at ${firstItem.company}`
		}

		return 'Software Engineer';
	}
    return <>
        <SideNavComponent className={className} navItems={items} otherItems={[<DarkModelToggle key={0}/>]}>
            <div className="flex flex-col gap-4">
                <Header level={1}>Braydon Jones</Header>
                <Header level={3}>{getSubtitle()}</Header>
                <img className="rounded-full w-52 h-52 object-cover object-left" src="/me-and-wifey.jpeg"/>
                <p className="text-l max-w-xs">I&#39;m a software developer with many passions and hobbies 
                currently studying at Brigham Young University</p>
            </div>
        </SideNavComponent>
    </>
}
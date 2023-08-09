import React, { createRef, useEffect, useRef, useState } from "react"
import Header from "../base/header"
import { Footer } from "./footer"
import { AboutDisplay } from "../info-section/about/about-display"
import { ExperienceDisplay } from "../info-section/experience/experience-list"
import { ProjectDisplay } from "../info-section/projects/project-list"

interface NavItem {
    label: string,
    id: string,
    content: React.ReactNode
}
export type SideNavComponentProps = {
    titleContent: React.ReactNode,
    navItems: NavItem[],
    className?: string
}
export const SideNavComponent = ({titleContent, navItems, className}: SideNavComponentProps) => {
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
            <div className="flex-1 flex flex-col sticky max-h-screen py-24 top-0">
                <div className="flex-1">
                    {titleContent}
                    <ul className="mt-10 flex flex-col gap-4">
                        {navItems.map((item, i)=> {
                            const activeClass = activeId == item.id ? 'text-blue-700': 'text-gray-900'
                            return <li key={i}>
                                <a href={`#${item.id}`} className={`${activeClass} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                                    onClick={(e) => {e.preventDefault(); onNavItemClick(item)}}>
                                    {item.label}
                                </a>
                            </li>
                        })}
                    </ul>
                </div>
                <Footer/>
            </div>
            <div className="flex-1 py-24 flex flex-col gap-16">
                {navItems.map((item, i) => <SideNavSection key={i} id={item.id} refObj={refs[item.id] as React.RefObject<HTMLSelectElement>}>
                    {item.content}
                </SideNavSection>)}
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
    return <>
        <SideNavComponent className={className} navItems={items} titleContent={<>
          <div className="flex flex-col gap-4">
            <Header level={1}>Braydon Jones</Header>
            <Header level={3}>Software Engineer Intern at Lucid</Header>
            <p className="text-gray-500 text-l max-w-xs">I&#39;m a software developer with many passions and hobbies 
            currently studying at Brigham Young University</p>
          </div>
        </>}/>
    </>
}
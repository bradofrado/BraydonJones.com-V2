import React from "react"
import Header from "../base/header"
import { Footer } from "./footer"

interface NavItem {
    label: string,
    link: string
}
export type SideNavComponentProps = {
    titleContent: React.ReactNode,
    navItems: NavItem[],
    className?: string
} & React.PropsWithChildren
export const SideNavComponent = ({titleContent, children, navItems, className}: SideNavComponentProps) => {
    return <>
        <div className={`flex flex-col md:flex-row ${className || ''}`}>
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    {titleContent}
                    <ul className="mt-10 flex flex-col gap-4">
                        {navItems.map((item, i)=> <li key={i}>
                            <a href={item.link} className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                {item.label}
                            </a>
                        </li>)}
                    </ul>
                </div>
                <Footer/>
            </div>
            <div className="flex-1">
                {children}
            </div>
            
        </div>
    </>
}

export type SideNavProps = {
    className?: string
} & React.PropsWithChildren;
export const SideNav = ({children, className}: SideNavProps) => {
    const items: NavItem[] = [
        {
            label: 'About',
            link: '#about'
        },
        {
            label: 'Experience',
            link: '#experience',
        },
        {
            label: 'Projects',
            link: '#projects'
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
        </>}>
          {children}
        </SideNavComponent>
    </>
}
import { ExperienceItem } from "~/utils/types/experience"
import Header from "../base/header"
import { Pill } from "../base/pill"
import { displayDates } from "~/utils/utils"

export type ExperienceCardProps = {
    item: ExperienceItem
  }
export const ExperienceCard = ({item}: ExperienceCardProps) => {
    return <>
      <a className="flex cursor-pointer hover:bg-gray-200 p-5 rounded-md">
        <div className="mr-5">
          <header className="text-xs font-semibold uppercase tracking-wide text-slate-500">{displayDates(item.dates)}</header>
        </div>
        <div className="flex gap-2 flex-col flex-1">
          <Header className="leading-snug" level={4}>{item.title} · {item.company}</Header>
          <p className="mt-2 text-sm leading-normal">{item.description}</p>
          <ul className="flex flex-wrap">
            {item.tags.map((tag, i) => <Pill key={i} className="mr-1.5 mt-2">{tag}</Pill>)}
          </ul>
        </div>
      </a>
    </>
  }
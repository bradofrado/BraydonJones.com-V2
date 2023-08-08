import { ExperienceItem } from "~/utils/types/experience"
import { displayDates } from "~/utils/utils"
import { BaseCard } from "~/utils/components/info-section/base-card"

export type ExperienceCardProps = {
    item: ExperienceItem
  }
export const ExperienceCard = ({item}: ExperienceCardProps) => {
    const title = `${item.title} · ${item.company}`;
    return <>
        <BaseCard title={title} description={item.description} link={item.link} tags={item.tags}>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{displayDates(item.dates)}</span>
        </BaseCard>
    </>
  }
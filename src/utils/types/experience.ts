import { AttachmentItem } from "./base"

export interface ExperienceItem {
    dates: DateRange,
    title: string,
    company: string,
    description: string,
    tags: string[],
    attachments: AttachmentItem[],
    link: string
  }
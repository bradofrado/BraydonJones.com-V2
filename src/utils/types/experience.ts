import { AttachmentItem, BaseItem } from "./base"

export interface ExperienceItem extends BaseItem {
    dates: DateRange,
    company: string,
  }
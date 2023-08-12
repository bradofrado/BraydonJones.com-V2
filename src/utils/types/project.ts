import { AttachmentItem } from "./base"

export interface ProjectItem {
    title: string,
    description: string,
    tags: string[],
    attachments: AttachmentItem[],
    image: string,
    link: string
}
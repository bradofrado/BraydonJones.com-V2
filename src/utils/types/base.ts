export interface AttachmentItem {
    label: string,
    link: string
}

export interface BaseItem {
    title: string,
    description: string,
    link: string,
    tags: string[],
    attachments: AttachmentItem[]
}
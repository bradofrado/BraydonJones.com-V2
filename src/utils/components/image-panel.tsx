import Image from "next/image"
import React from "react"

export type ImagePanelProps = {
    image: string,
    alt: string,
    center?: boolean
} & React.PropsWithChildren
export const ImagePanel = ({image, alt, center=false, children}: ImagePanelProps) => {
    return <>
        <div className="flex">
            <div className={`flex-1 ${center && 'flex items-center self-center'}`}>
                {children}
            </div>
            <div className="flex-1">
                <img className="max-w-full" src={image} alt={alt}/>
            </div>
        </div>
    </>
}
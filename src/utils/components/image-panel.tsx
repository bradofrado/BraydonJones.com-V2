import Image from "next/image"
import React from "react"

export type ImagePanelProps = {
    image: string,
    alt: string,
    center?: boolean,
    reverse?: boolean,
} & React.PropsWithChildren
export const ImagePanel = ({image, alt, reverse=false, center=false, children}: ImagePanelProps) => {
    return <>
        <div className={`flex ${reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-1 ${center && 'flex items-center self-center'}`}>
                {center ? <div className="flex gap-8 flex-col w-[50%] m-auto">{children}</div> :
                children}
            </div>
            <div className="flex-1">
                <Image className="max-w-[50%] mx-auto" src={image} alt={alt}/>
            </div>
        </div>
    </>
}
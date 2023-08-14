import React from "react";
import { useState } from "react"
import { MinusIcon, PlusIcon } from "../icons/icons";

type AccordionId = `accordion-${number}`;
export interface AccordionItem {
    label: string,
    content: React.ReactNode
}
export type AccordionProps = {
    items: AccordionItem[]
}
//TODO: Currently the accordion only supports opening and closing for one item. 
//      Add support for both (will need to use typescript instead of tailwind group identifiers)
export const Accordion = ({items}: AccordionProps) => {
    const [selected, setSelected] = useState<AccordionId | undefined>();
    const toggleSelected = (id: AccordionId) => {
        if (selected == id) {
            setSelected(undefined);
        } else {
            setSelected(id);
        }
    }
    return <>
        <div className={`group ${selected}`}>
            {items.map((item, i) => <React.Fragment key={i}>
                <h2 id="accordion-collapse-heading-1">
                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 group-[.accordion-1]:bg-gray-100 group-[.accordion-1]:dark:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1"
                        onClick={() => toggleSelected('accordion-1')}>
                        <span>{item.label}</span>
                        <PlusIcon className="w-4 h-4 group-[.accordion-1]:hidden"/>
                        <MinusIcon className="w-4 h-4 hidden group-[.accordion-1]:block"/>
                    </button>
                </h2>
                <div id="accordion-collapse-body-1" className="hidden group-[.accordion-1]:block" aria-labelledby="accordion-collapse-heading-1">
                    <div className="p-5 ">
                        {item.content}
                    </div>
                </div>
            </React.Fragment>)}
        </div>
    </>
}
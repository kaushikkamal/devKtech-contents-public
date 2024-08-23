import { useState } from 'react';

import EachAccordion from './EachAccordion';

export interface IAccordionData {
    title: string;
    description: string;
}

const Accordion = () => {
    const [isOpen, setIsOpen] = useState(-1);

    const accordionData: IAccordionData[] = [
        {
            title: `What is this?`,
            description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim temporibus reprehenderit corrupti aliquam autem laboriosam, distinctio ab illum, et, provident incidunt perferendis est cum. Neque exercitationem suscipit a perspiciatis.`,
        },
        {
            title: 'Is it really important?',
            description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim temporibus reprehenderit corrupti aliquam autem laboriosam, distinctio ab illum, et, provident incidunt perferendis est cum. Neque exercitationem suscipit a perspiciatis.`,
        },
    ];

    const handleAccordion = (index: number) => {
        setIsOpen(index);
    };

    return (
        <div className="flex flex-col gap-4">
            {accordionData.map((eachAccordion, index) => {
                return (
                    <EachAccordion
                        key={index}
                        index={index}
                        data={eachAccordion}
                        isOpen={isOpen}
                        handleAccordion={handleAccordion}
                    />
                );
            })}
        </div>
    );
};

export default Accordion;

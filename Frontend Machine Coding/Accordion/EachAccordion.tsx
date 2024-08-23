import { useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { IAccordionData } from './Accordion';

interface IProps {
    data: IAccordionData;
    index: number;
    isOpen: number;
    handleAccordion: (index: number) => void;
}

const EachAccordion = ({ data, index, isOpen, handleAccordion }: IProps) => {
    const { title, description } = data;
    const heightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        heightRef.current!.focus();
    });

    return (
        <Card
            className="w-full sm:w-[600px] bg-transparent border-primary/20 hover:border-primary-900 rounded-md flex flex-col p-6 mb-0 cursor-pointer"
            onClick={() => {
                if (isOpen === index) {
                    handleAccordion(-1);
                } else {
                    handleAccordion(index);
                }
            }}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-primary">{title}</h3>
                {isOpen === index ? (
                    <ChevronUp size={24} color="#ffffff" />
                ) : (
                    <ChevronDown size={24} color="#ffffff" />
                )}
            </div>
            <div
                ref={heightRef}
                className={`overflow-hidden transition-all duration-200 ease-in-out`}
                style={
                    isOpen === index
                        ? { height: heightRef.current!.scrollHeight }
                        : { height: '0px' }
                }
            >
                <p className="pt-6 text-lg tracking-wide text-primary">
                    {description}
                </p>
            </div>
        </Card>
    );
};

export default EachAccordion;

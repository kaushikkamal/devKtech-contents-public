import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TabLayout = () => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (index: number) => {
        setTab(index);
    };

    const DATA = [
        {
            title: `HTML`,
            content: `The HyperText Markup Language or HTML is the standard
						markup language for documents designed to be displayed
						in a web browser.`,
        },
        {
            title: `CSS`,
            content: `Cascading Style Sheets is a style sheet language used
						for describing the presentation of a document written in
						a markup language such as HTML or XML.`,
        },
        {
            title: `JS`,
            content: `JavaScript, often abbreviated as JS, is a programming
						language that is one of the core technologies of the
						World Wide Web, alongside HTML and CSS.`,
        },
    ];

    return (
        <div className="w-[90%] sm:w-[600px] flex flex-col gap-8">
            <div className="flex flex-wrap gap-4">
                {DATA.map((each, index) => {
                    return (
                        <Button
                            key={index}
                            onClick={() => {
                                handleTabChange(index);
                            }}
                            variant={tab === index ? `default` : `outline`}
                        >
                            {each.title}
                        </Button>
                    );
                })}
            </div>
            <div>
                <Card className="flex flex-col justify-between">
                    <CardContent className="flex justify-end p-6">
                        <p>{DATA[tab].content}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TabLayout;

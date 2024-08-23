import { useEffect, useState } from 'react';
import EachData from './EachData';

const InfiniteScroll = () => {
    const [count, setCount] = useState(20);
    const elements = [];

    for (let i = 0; i < count; i++) {
        elements.push(EachData(i));
    }

    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                window.document.body.offsetHeight - 30
            ) {
                setCount((prev) => prev + 20);
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [count]);

    return (
        <div className="w-full sm:w-[750px] flex flex-col items-center">
            {elements}
        </div>
    );
};

export default InfiniteScroll;

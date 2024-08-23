import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const StopWatch = () => {
    const [timer, setTimer] = useState(0);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isOn) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else {
            setTimer(0);
            clearInterval(interval!);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer, isOn]);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="text-5xl">{timer}</div>
            <Button
                variant={isOn ? 'destructive' : 'outline'}
                onClick={() => {
                    setIsOn((prev) => !prev);
                }}
            >
                {isOn ? 'Stop' : 'Start'}
            </Button>
        </div>
    );
};

export default StopWatch;

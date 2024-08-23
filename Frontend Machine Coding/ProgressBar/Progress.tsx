import { useEffect, useState } from 'react';

interface IProps {
    progress: number;
    setIsComplete: (val: boolean) => void;
}

const Progress = ({ progress = 0, setIsComplete }: IProps) => {
    const MIN = 0;
    const MAX = 100;

    const [percentage, setPercentage] = useState(progress);

    useEffect(() => {
        setPercentage(Math.min(Math.max(MIN, progress), MAX));

        if (progress >= MAX) {
            setIsComplete(true);
        }
    }, [progress, setIsComplete]);

    return (
        <>
            <div className="bg-transparent border border-primary-700/50 h-[20px] w-full rounded-md">
                <div
                    aria-valuemin={MIN}
                    aria-valuemax={MAX}
                    aria-valuenow={percentage}
                    role="ProgressBarr"
                    className={`rounded-md h-full`}
                    style={{
                        backgroundColor: `green`,
                        transform: `scaleX(${percentage / MAX})`,
                        transformOrigin: 'left',
                    }}
                />
            </div>
            <p>{percentage}%</p>
        </>
    );
};

export default Progress;

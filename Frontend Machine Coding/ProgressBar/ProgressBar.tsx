import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Progress from './Progress';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleStartProgress = () => {
        setIsComplete(false);
        setProgress(0);

        setInterval(() => {
            setProgress((prev) => prev + 1);
        }, 100);
    };

    /*
    To start the progress automatically on page load
    */
   
    // useEffect(() => {
    //     setInterval(() => {
    //         setProgress((prev) => prev + 1);
    //     }, 100);
    // }, []);

    return (
        <div className="w-full sm:w-[400px] flex flex-col items-center gap-4">
            <Progress progress={progress} setIsComplete={setIsComplete} />
            <p>
                {isComplete
                    ? `Completed`
                    : progress === 0
                      ? `Let's Start`
                      : `Loading...`}
            </p>
            <Button
                variant="outline"
                className="w-min"
                onClick={handleStartProgress}
            >
                {progress === 0 ? `Start` : isComplete ? `Restart` : `Reset`}
            </Button>
        </div>
    );
};

export default ProgressBar;

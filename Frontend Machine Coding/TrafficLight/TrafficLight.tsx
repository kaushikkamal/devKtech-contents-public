import { useEffect, useState } from 'react';

enum STATES {
    RED = 'red',
    YELLOW = 'yellow',
    GREEN = 'green',
    // YELLOWGREEN = "YellowGreen",
}

interface IConfig {
    backgroundColor: string;
    duration: number;
    nextState: STATES;
}

const config: Record<string, IConfig> = {
    [STATES.RED as string]: {
        backgroundColor: STATES.RED,
        duration: 4000,
        nextState: STATES.YELLOW,
    },
    [STATES.YELLOW as string]: {
        backgroundColor: STATES.YELLOW,
        duration: 3000,
        nextState: STATES.GREEN,
    },
    [STATES.GREEN as string]: {
        backgroundColor: STATES.GREEN,
        duration: 5000,
        // nextState: STATES.YELLOWGREEN,
        nextState: STATES.RED,
    },
    // [STATES.YELLOWGREEN as string]: {
    // 	backgroundColor: "yellow",
    // 	duration: 2000,
    // 	nextState: STATES.RED,
    // },
};
type props = {
    backgroundColor: string | undefined;
};

const Light = ({ backgroundColor }: props) => {
    return (
        <div
            className="h-[80px] w-[80px] rounded-full bg-[#7a7a7a]"
            style={{ backgroundColor: backgroundColor }}
        />
    );
};

const TrafficLight = () => {
    const [currentState, setCurrentState] = useState(STATES.RED);

    useEffect(() => {
        const { duration, nextState } = config[currentState];
        const timer = setTimeout(() => {
            setCurrentState(nextState);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [currentState]);

    return (
        <div className="w-[150px] flex flex-col justify-center items-center gap-6 px-8 py-6 bg-[#262626] rounded-lg">
            {Object.keys(config).map((eachColor: string) => (
                <Light
                    key={eachColor}
                    backgroundColor={
                        currentState === eachColor
                            ? config[eachColor].backgroundColor
                            : undefined
                    }
                />
            ))}
        </div>
    );
};

export default TrafficLight;

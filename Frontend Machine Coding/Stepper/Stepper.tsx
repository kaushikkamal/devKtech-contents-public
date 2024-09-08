import { useEffect, useRef, useState } from 'react';
import STEPPER_DATA from './StepperData';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import STEPPER_VARIANT from './StepperVariant';

const Stepper = () => {
    const ref = useRef<(HTMLDivElement | null)[]>([]);
    const [stepperVariant, setStepperVariant] = useState<STEPPER_VARIANT>(
        STEPPER_VARIANT.VERTICAL,
    );
    const [currentActiveStepper, setCurrentActiveStepper] = useState(1);
    const [isStepperCompleted, setIsStepperCompleted] = useState(false);

    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    });

    const handleResetStepper = () => {
        setCurrentActiveStepper(1);
        setIsStepperCompleted(false);
    };

    const handleNextStepStepper = () => {
        setCurrentActiveStepper((prev) => {
            if (prev === STEPPER_DATA.length) {
                setIsStepperCompleted(true);
                return prev;
            } else {
                return prev + 1;
            }
        });
    };

    const calculateProgressBarHeightOrWidth = () => {
        return ((currentActiveStepper - 1) / (STEPPER_DATA.length - 1)) * 100;
    };

    useEffect(() => {
        if (stepperVariant === STEPPER_VARIANT.VERTICAL) {
            setMargins({
                marginLeft: 0,
                marginRight: 0,
                marginTop: ref.current && ref.current[0]!.offsetHeight / 2,
                marginBottom:
                    ref.current &&
                    ref.current[STEPPER_DATA.length - 1]!.offsetHeight / 2,
            });
        } else {
            setMargins({
                marginTop: 0,
                marginBottom: 0,
                marginLeft: ref.current && ref.current[0]!.offsetWidth / 2,
                marginRight:
                    ref.current &&
                    ref.current[STEPPER_DATA.length - 1]!.offsetWidth / 2,
            });
        }
    }, [ref, stepperVariant]);

    const handleStepperVariant = (variant: STEPPER_VARIANT) => {
        setStepperVariant(variant);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full sm:w-[400px]">
            <div className="flex flex-row gap-8">
                <Button
                    variant={
                        stepperVariant === STEPPER_VARIANT.VERTICAL
                            ? 'default'
                            : 'outline'
                    }
                    onClick={() => {
                        handleStepperVariant(STEPPER_VARIANT.VERTICAL);
                    }}
                >
                    {STEPPER_VARIANT.VERTICAL}
                </Button>
                <Button
                    variant={
                        stepperVariant === STEPPER_VARIANT.HORIZONTAL
                            ? 'default'
                            : 'outline'
                    }
                    onClick={() => {
                        handleStepperVariant(STEPPER_VARIANT.HORIZONTAL);
                    }}
                >
                    {STEPPER_VARIANT.HORIZONTAL}
                </Button>
            </div>
            <div
                className="flex gap-4 w-full sm:w-[400px]"
                style={{
                    flexDirection:
                        stepperVariant === STEPPER_VARIANT.VERTICAL
                            ? `row`
                            : `column`,
                }}
            >
                <div
                    className={`flex gap-4 justify-between relative`}
                    style={{
                        flexDirection:
                            stepperVariant === STEPPER_VARIANT.VERTICAL
                                ? `column`
                                : `row`,
                    }}
                >
                    <>
                        {STEPPER_DATA.map((_: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    ref={(element) =>
                                        (ref.current[index] = element)
                                    }
                                    className="flex items-center p-4 z-10"
                                >
                                    <div
                                        className="flex justify-center items-center h-[30px] w-[30px] rounded-full p-6"
                                        style={{
                                            backgroundColor:
                                                index + 1 <
                                                    currentActiveStepper ||
                                                isStepperCompleted
                                                    ? 'green'
                                                    : index + 1 ===
                                                        currentActiveStepper
                                                      ? 'blue'
                                                      : 'black',
                                            borderWidth: 1,
                                            borderColor:
                                                index + 1 ===
                                                    currentActiveStepper &&
                                                !isStepperCompleted
                                                    ? 'blue'
                                                    : 'green',
                                        }}
                                    >
                                        <h3
                                            className={`text-2xl`}
                                            style={{
                                                color: 'white',
                                            }}
                                        >
                                            {index + 1}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                        {stepperVariant === STEPPER_VARIANT.VERTICAL ? (
                            <div
                                className="w-[3px] absolute left-[50%] top-0"
                                style={{
                                    backgroundColor: `#ccc`,
                                    height: `calc(100% - ${margins.marginTop + margins.marginBottom}px)`,
                                    marginTop: margins.marginTop,
                                    marginBottom: margins.marginBottom,
                                }}
                            >
                                <div
                                    className="w-full duration-200"
                                    style={{
                                        backgroundColor: `green`,
                                        height: `${calculateProgressBarHeightOrWidth()}%`,
                                    }}
                                />
                            </div>
                        ) : (
                            <div
                                className="h-[3px] absolute top-[50%] left-0"
                                style={{
                                    backgroundColor: `#ccc`,
                                    width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                                    marginLeft: margins.marginLeft,
                                    marginRight: margins.marginRight,
                                }}
                            >
                                <div
                                    className="h-full duration-200"
                                    style={{
                                        backgroundColor: `green`,
                                        width: `${calculateProgressBarHeightOrWidth()}%`,
                                    }}
                                />
                            </div>
                        )}
                    </>
                </div>
                <Card className="w-full flex flex-col">
                    <CardHeader className="">
                        <CardTitle className="font-ralewayMedium tracking-wide">
                            {isStepperCompleted
                                ? 'Completed'
                                : STEPPER_DATA[currentActiveStepper - 1].title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grow">
                        {isStepperCompleted
                            ? 'Click on reset to start again'
                            : STEPPER_DATA[currentActiveStepper - 1].Component}
                    </CardContent>
                    <CardFooter className="flex justify-end ">
                        <Button
                            variant="outline"
                            className=""
                            onClick={() => {
                                if (isStepperCompleted) {
                                    handleResetStepper();
                                } else {
                                    handleNextStepStepper();
                                }
                            }}
                        >
                            {isStepperCompleted ? `Reset` : `Next`}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Stepper;

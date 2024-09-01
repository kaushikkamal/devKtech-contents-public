import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";

const StopWatch = () => {
	const [timer, setTimer] = useState(0);
	const [isOn, setIsOn] = useState(false);
	const timeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

	const handleStart = () => {
		if (isOn) return;
		setIsOn(true);
		timeInterval.current = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 10);
	};

	const handlePause = () => {
		if (!isOn) return;
		setIsOn(false);
		clearInterval(timeInterval.current!);
	};

	const handleReset = () => {
		setIsOn(false);
		clearInterval(timeInterval.current!);
		setTimer(0);
	};

	const formatTime = (timer: number) => {
		const minutes = Math.floor(timer / 60000)
			.toString()
			.padStart(2, "0");
		const seconds = Math.floor((timer / 1000) % 60)
			.toString()
			.padStart(2, "0");
		const milliseconds = (timer % 1000).toString().padStart(3, "0");

		return { minutes, seconds, milliseconds };
	};

	const { minutes, seconds, milliseconds } = formatTime(timer);

	return (
		<div className="flex flex-col gap-6 items-center p-6">
			<h2 className="text-5xl">
				{minutes} : {seconds} : {milliseconds}
			</h2>
			<div className="flex flex-wrap gap-4">
				<Button variant="default" onClick={handleStart} disabled={isOn}>
					Start
				</Button>
				<Button
					variant="secondary"
					onClick={handlePause}
					disabled={!isOn}
				>
					Pause
				</Button>
				<Button
					variant="destructive"
					onClick={handleReset}
					disabled={timer === 0}
				>
					Reset
				</Button>
			</div>
		</div>
	);
};

export default StopWatch;

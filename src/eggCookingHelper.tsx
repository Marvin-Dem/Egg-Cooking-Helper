import { useEffect, useState } from "react";

function createAudio() {
    const audio = new Audio("/alert.mp3");
    audio.loop = true;
    return audio;
}

export default function EggCookingHelper() {
    type EggSize = "S" | "M" | "L";
    type BoilingLevel = "Soft" | "Medium" | "Hard";

    const [eggSize, setEggSize] = useState<EggSize>("M");
    const [boilingLevel, setBoilingLevel] = useState<BoilingLevel>("Medium");
    const [remainingTimerSeconds, setRemainingTimerSeconds] = useState(0);
    const [intervalID, setIntervalID] = useState<number>();
    const [alertActive, setAlertActive] = useState(false);
    const [audio] = useState(createAudio());

    const cookingTimes = new Map<EggSize, Map<BoilingLevel, number>>();
    const minutes = Math.floor(remainingTimerSeconds / 60);
    const seconds = remainingTimerSeconds % 60;

    cookingTimes.set(
        "S",
        new Map<BoilingLevel, number>()
            .set("Soft", 3)
            .set("Medium", 5)
            .set("Hard", 7)
    );

    cookingTimes.set(
        "M",
        new Map<BoilingLevel, number>()
            .set("Soft", 4)
            .set("Medium", 6)
            .set("Hard", 8)
    );

    cookingTimes.set(
        "L",
        new Map<BoilingLevel, number>()
            .set("Soft", 5)
            .set("Medium", 7)
            .set("Hard", 9)
    );

    function calcBoilTime(eggSize: EggSize, boilingLevel: BoilingLevel) {
        const sizeMap = cookingTimes.get(eggSize);
        if (!sizeMap) {
            return;
        }
        const cookingTime = sizeMap.get(boilingLevel);
        if (!cookingTime) {
            return;
        }
        const timeInSeconds = cookingTime * 60;
        return timeInSeconds;
    }

    function reduceTimer() {
        setRemainingTimerSeconds((remainingTimerSeconds) => {
            if (remainingTimerSeconds > 1) {
                return remainingTimerSeconds - 1;
            }
            setAlertActive(true);
            setIntervalID((intervalID) => {
                clearInterval(intervalID);
                return undefined;
            });
            audio.play();
            return 0;
        });
    }

    useEffect(() => {
        const boilingSeconds = calcBoilTime(eggSize, boilingLevel);
        if (!boilingSeconds) {
            return;
        }
        setRemainingTimerSeconds(boilingSeconds);
    }, [eggSize, boilingLevel]);

    return (
        <div className="bg-[rgb(204,193,173)] flex justify-center overflow-hidden">
            <div className="bg-[url('/kitchen-bg.png')] bg-no-repeat bg-contain bg-center border-x-8 border-[rgb(165,133,116)] h-screen aspect-[980/931]">
                <div className="flex flex-col items-center justify-center h-screen gap-y-4">
                    <div className="font-bold text-4xl">Egg Cooking Helper</div>
                    <div>
                        <div className="text-xl flex justify-center">
                            Select the Egg Size:
                        </div>
                        <div className="gap-2 flex">
                            <button
                                className={`border border-black rounded-lg p-2 px-6 font-bold hover:scale-105 ${
                                    eggSize === "S" ? "bg-black/20" : "bg-white"
                                }`}
                                key={"S"}
                                onClick={() => {
                                    setEggSize("S");
                                }}
                            >
                                S
                            </button>
                            <button
                                className={`border border-black rounded-lg p-2 px-6 font-bold hover:scale-105 ${
                                    eggSize === "M" ? "bg-black/20" : "bg-white"
                                }`}
                                key={"M"}
                                onClick={() => {
                                    setEggSize("M");
                                }}
                            >
                                M
                            </button>
                            <button
                                className={`border border-black rounded-lg p-2 px-6 font-bold hover:scale-105 ${
                                    eggSize === "L" ? "bg-black/20" : "bg-white"
                                }`}
                                key={"L"}
                                onClick={() => {
                                    setEggSize("L");
                                }}
                            >
                                L
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="text-xl flex justify-center">
                            Select the desired consistency:
                        </div>
                        <div className="flex gap-2">
                            <button
                                className={`border border-black rounded-lg p-2 px-6 font-bold hover:scale-105 ${
                                    boilingLevel === "Soft"
                                        ? "bg-black/20"
                                        : "bg-white"
                                }`}
                                key={"Soft"}
                                onClick={() => {
                                    setBoilingLevel("Soft");
                                }}
                            >
                                Soft
                            </button>
                            <button
                                className={`border border-black rounded-lg p-2 px-6 font-bold hover:scale-105 ${
                                    boilingLevel === "Medium"
                                        ? "bg-black/20"
                                        : "bg-white"
                                }`}
                                key={"Medium"}
                                onClick={() => {
                                    setBoilingLevel("Medium");
                                }}
                            >
                                Medium
                            </button>
                            <button
                                className={`border border-black rounded-lg p-2 px-6 font-bold hover:scale-105 ${
                                    boilingLevel === "Hard"
                                        ? "bg-black/20"
                                        : "bg-white"
                                }`}
                                key={"Hard"}
                                onClick={() => {
                                    setBoilingLevel("Hard");
                                }}
                            >
                                Hard
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-xl flex justify-center">
                            Calculated Cooking Time:
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center text-3xl border-2 border-black rounded-lg bg-white/50 p-2 font-bold font-mono">
                                {minutes}:{seconds.toString().padStart(2, "0")}
                            </div>
                            {intervalID === undefined && (
                                <button
                                    className="border border-black rounded-lg bg-white p-2 px-6 font-bold hover:bg-white/70 hover:scale-105"
                                    onClick={() => {
                                        const intervalID = setInterval(
                                            reduceTimer,
                                            1000
                                        );
                                        setIntervalID(intervalID);
                                    }}
                                >
                                    Start Timer
                                </button>
                            )}
                            {intervalID !== undefined && (
                                <button
                                    className="border border-black rounded-lg bg-white p-2 px-6 font-bold hover:bg-white/70 hover:scale-105"
                                    onClick={() => {
                                        const initialBoilingTime = calcBoilTime(
                                            eggSize,
                                            boilingLevel
                                        );
                                        if (initialBoilingTime !== undefined) {
                                            setRemainingTimerSeconds(
                                                initialBoilingTime
                                            );
                                        }
                                        clearInterval(intervalID);
                                        setIntervalID(undefined);
                                        setAlertActive(false);
                                    }}
                                >
                                    Stop Timer
                                </button>
                            )}
                        </div>
                        {alertActive && (
                            <div className="fixed h-screen inset-0 bg-black/50 flex justify-center items-center z-1">
                                <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                                    <div className="text-3xl text-center mb-4 font-bold">
                                        Your Egg is ready!
                                    </div>
                                    <button
                                        className="border border-black rounded-lg bg-white p-2 px-6 font-bold hover:scale-105"
                                        onClick={() => {
                                            audio.pause();
                                            audio.currentTime = 0;
                                            setAlertActive(false);
                                            const initialBoilingTime =
                                                calcBoilTime(
                                                    eggSize,
                                                    boilingLevel
                                                );
                                            if (
                                                initialBoilingTime !== undefined
                                            ) {
                                                setRemainingTimerSeconds(
                                                    initialBoilingTime
                                                );
                                            }
                                        }}
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

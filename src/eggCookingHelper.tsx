import { useEffect, useState } from "react";

function createAudio() {
    const audio = new Audio("/alert.mp3");
    audio.loop = true;
    return audio;
}

export default function EggCookingHelper() {
    type EggSize = "S" | "M" | "L";
    type BoilingLevel = "Soft" | "Medium" | "Hard";

    const [eggSize, setEggSize] = useState<EggSize>("S");
    const [boilingLevel, setBoilingLevel] = useState<BoilingLevel>("Soft");
    const [remainingTimerSeconds, setRemainingTimerSeconds] = useState(0);
    const [intervalID, setIntervalID] = useState<number>();
    const [alertActive, setAlertActive] = useState(false);
    const [audio] = useState(createAudio());

    const cookingTimes = new Map<EggSize, Map<BoilingLevel, number>>();
    const minutes = Math.floor(remainingTimerSeconds / 60);
    const seconds = remainingTimerSeconds % 60;

    //Test Timer Zeit vor PR umstellen auf 3

    cookingTimes.set(
        "S",
        new Map<BoilingLevel, number>()
            .set("Soft", 0.05)
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
        <div>
            <h1>Egg Cooking Helper</h1>
            <div>
                <h3>Select the Egg Size:</h3>
                <button
                    key={"S"}
                    onClick={() => {
                        setEggSize("S");
                    }}
                >
                    S
                </button>
                <button
                    key={"M"}
                    onClick={() => {
                        setEggSize("M");
                    }}
                >
                    M
                </button>
                <button
                    key={"L"}
                    onClick={() => {
                        setEggSize("L");
                    }}
                >
                    L
                </button>
            </div>
            <div>
                <h3>Select the desired consistency:</h3>
                <button
                    key={"Soft"}
                    onClick={() => {
                        setBoilingLevel("Soft");
                    }}
                >
                    Soft
                </button>
                <button
                    key={"Medium"}
                    onClick={() => {
                        setBoilingLevel("Medium");
                    }}
                >
                    Medium
                </button>
                <button
                    key={"Hard"}
                    onClick={() => {
                        setBoilingLevel("Hard");
                    }}
                >
                    Hard
                </button>
            </div>
            <div>
                <h3>Calculated Cooking Time:</h3>
                <div>
                    {minutes}:{seconds.toString().padStart(2, "0")}
                </div>
                {intervalID === undefined && (
                    <button
                        onClick={() => {
                            const intervalID = setInterval(reduceTimer, 1000);
                            setIntervalID(intervalID);
                        }}
                    >
                        Start Timer
                    </button>
                )}
                {intervalID !== undefined && (
                    <button
                        onClick={() => {
                            const initialBoilingTime = calcBoilTime(
                                eggSize,
                                boilingLevel
                            );
                            if (initialBoilingTime !== undefined) {
                                setRemainingTimerSeconds(initialBoilingTime);
                            }
                            clearInterval(intervalID);
                            setIntervalID(undefined);
                            setAlertActive(false);
                        }}
                    >
                        Stop Timer
                    </button>
                )}
                {alertActive && (
                    <div>
                        <h3>Your Egg is ready!</h3>
                        <button
                            onClick={() => {
                                audio.pause();
                                audio.currentTime = 0;
                                setAlertActive(false);
                                const initialBoilingTime = calcBoilTime(
                                    eggSize,
                                    boilingLevel
                                );
                                if (initialBoilingTime !== undefined) {
                                    setRemainingTimerSeconds(
                                        initialBoilingTime
                                    );
                                }
                            }}
                        >
                            Got it!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

//Morgen ansetzen: SoundDatei einbauen, wenn Timer auf 0 geht

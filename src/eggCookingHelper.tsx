import { useState } from "react";

export default function EggCookingHelper() {
    type EggSize = "S" | "M" | "L";
    type BoilingLevel = "Soft" | "Medium" | "Hard";

    const [eggSize, setEggSize] = useState<EggSize>();
    const [boilingLevel, setBoilingLevel] = useState<BoilingLevel>();

    const cookingTimes = new Map<EggSize, Map<BoilingLevel, number>>();

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

    // const cookingTime = cookingTimes.get(eggSize).get(boilingLevel);

    // if (cookingTime !== undefined) {

    // }

    function calcBoilTime(eggSize: EggSize, boilingLevel: BoilingLevel) {
        let calculatedTime;
        const sizeMap = cookingTimes.get(eggSize);
        return calculatedTime;
    }

    return (
        <div>
            <h1>Egg Cooking Helper</h1>
            <div>
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
        </div>
    );
}

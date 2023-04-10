import { STSRelicCtor } from "./NativeClassWrap/AbstractRelic.js";
import { Mechanization } from "./NewRelics/Mechanization.js";
import { TheOneRing } from "./NewRelics/TheOneRing.js";
import { TheRingOfPower } from "./NewRelics/TheRingOfPower.js";

export const newRelicLibrary: STSRelicCtor[] = [
    Mechanization,
    TheOneRing,
    TheRingOfPower,
];
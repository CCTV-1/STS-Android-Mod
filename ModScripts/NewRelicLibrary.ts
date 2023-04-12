import { STSRelicCtor } from "./NativeClassWrap/AbstractRelic.js";
import { Mechanization } from "./NewRelics/Mechanization.js";
import { TheOneRing } from "./NewRelics/TheOneRing.js";
import { TheSoulRing } from "./NewRelics/TheSoulRing.js";
import { TheStrengthRing } from "./NewRelics/TheStrengthRing.js";

export const newRelicLibrary: STSRelicCtor[] = [
    Mechanization,
    TheOneRing,
    TheStrengthRing,
    TheSoulRing,
];
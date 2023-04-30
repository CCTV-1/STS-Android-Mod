import { STSRelicCtor } from "./NativeClassWrap/AbstractRelic.js";
import { Mechanization } from "./NewRelics/Mechanization.js";
import { TheArcaneRing } from "./NewRelics/TheArcaneRing.js";
import { TheChaosRing } from "./NewRelics/TheChaosRing.js";
import { TheHistoryBook } from "./NewRelics/TheHistoryBook.js";
import { TheOneRing } from "./NewRelics/TheOneRing.js";
import { TheSoulRing } from "./NewRelics/TheSoulRing.js";
import { TheStrengthRing } from "./NewRelics/TheStrengthRing.js";

export const newRelicLibrary: STSRelicCtor[] = [
    Mechanization,
    TheArcaneRing,
    TheChaosRing,
    TheHistoryBook,
    TheOneRing,
    TheSoulRing,
    TheStrengthRing,
];
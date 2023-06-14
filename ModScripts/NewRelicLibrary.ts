import { STSRelicCtor } from "./NativeClassWrap/AbstractRelic.js";
import { GeneralKnowledgeRune } from "./NewRelics/GeneralKnowledgeRune.js";
import { Mechanization } from "./NewRelics/Mechanization.js";
import { OuterGodRune } from "./NewRelics/OuterGodRune.js";
import { TheArcaneRing } from "./NewRelics/TheArcaneRing.js";
import { TheChaosRing } from "./NewRelics/TheChaosRing.js";
import { TheHistoryBook } from "./NewRelics/TheHistoryBook.js";
import { TheOneRing } from "./NewRelics/TheOneRing.js";
import { TheSoulRing } from "./NewRelics/TheSoulRing.js";
import { TheStrengthRing } from "./NewRelics/TheStrengthRing.js";

export const newRelicLibrary: STSRelicCtor[] = [
    GeneralKnowledgeRune,
    Mechanization,
    OuterGodRune,
    TheArcaneRing,
    TheChaosRing,
    TheHistoryBook,
    TheOneRing,
    TheSoulRing,
    TheStrengthRing,
];
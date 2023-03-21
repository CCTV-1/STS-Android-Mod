import { STSRelicCtor } from "./AbstractRelic.js";
import { DoNothing } from "./NewRelics/DoNothing.js";

export const newRelicLibrary: STSRelicCtor[] = [
    DoNothing,
];
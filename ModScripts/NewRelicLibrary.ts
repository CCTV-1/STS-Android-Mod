import { STSRelicCtor } from "./NativeClassWrap/AbstractRelic.js";
import { DoNothing } from "./NewRelics/DoNothing.js";

export const newRelicLibrary: STSRelicCtor[] = [
    DoNothing,
];
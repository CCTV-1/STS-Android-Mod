import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SummonGremlinAction = {
    /** JObjectArray\<AbstractMonster\>* gremlins */
    Ctor(gremlins: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.SummonGremlin.Ctor)(NULL, gremlins);
    },
};

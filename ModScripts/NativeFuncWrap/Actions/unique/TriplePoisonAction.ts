import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const TriplePoisonAction = {
    Ctor(targetCreature: NativePointer, sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.TriplePoison.Ctor)(NULL, targetCreature, sourceCreature);
    },
};

import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DoublePoisonAction = {
    Ctor(targetCreature: NativePointer, sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.DoublePoison.Ctor)(NULL, targetCreature, sourceCreature);
    },
};
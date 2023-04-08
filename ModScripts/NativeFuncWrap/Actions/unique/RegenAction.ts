import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RegenAction = {
    Ctor(targetCreature: NativePointer, goldAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Regen.Ctor)(NULL, targetCreature, goldAmount);
    },
};

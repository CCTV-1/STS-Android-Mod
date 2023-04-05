import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DualWieldAction = {
    Ctor(sourceCreature: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.DualWield.Ctor)(NULL, sourceCreature, amount);
    },
};
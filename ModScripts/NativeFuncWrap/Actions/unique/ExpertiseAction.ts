import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ExpertiseAction = {
    Ctor(sourceCreature: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Expertise.Ctor)(NULL, sourceCreature, amount);
    },
};
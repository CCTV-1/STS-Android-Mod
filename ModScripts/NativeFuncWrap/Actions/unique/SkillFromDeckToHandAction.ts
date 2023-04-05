
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SkillFromDeckToHandAction = {
    Ctor(sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.SkillFromDeckToHand.Ctor)(NULL);
    },
};

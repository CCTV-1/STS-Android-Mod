
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RetainCardsAction = {
    Ctor(sourceCreature: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.RetainCards.Ctor)(NULL, sourceCreature, amount);
    },
};

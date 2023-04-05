import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ExhaustSpecificCardAction = {
    /**
     * group type is CardGroup
     */
    Ctor(targetCard: NativePointer, group: NativePointer, isFast: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ExhaustSpecificCard.Ctor)(NULL, targetCard, group, Number(isFast));
    },
};
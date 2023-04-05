import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const BetterDiscardPileToHandAction = {
    Ctor(numberOfCards: number, optional: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.BetterDiscardPileToHand.Ctor)(NULL, numberOfCards, Number(optional));
    },
    Ctor2(numberOfCards: number, newCost: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.BetterDiscardPileToHand.Ctor2)(NULL, numberOfCards, newCost);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const BetterDrawPileToHandAction = {
    Ctor(numberOfCards: number, optional: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.BetterDrawPileToHand.Ctor)(PatchHelper.nullptr, numberOfCards, Number(optional));
    },
    Ctor2(numberOfCards: number): NativePointer {
        return BetterDrawPileToHandAction.Ctor(numberOfCards, false);
    },
};
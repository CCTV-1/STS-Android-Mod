import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MakeTempCardInHandAction = {
    Ctor(cardPtr: NativePointer, numCards: number, isOtherCardInCenter: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardInHand.Ctor2)(NULL, cardPtr, numCards, Number(isOtherCardInCenter));
    }
};
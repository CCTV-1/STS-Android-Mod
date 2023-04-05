import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MakeTempCardInDiscardAction = {
    Ctor(card: NativePointer, sameUUID: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardInDiscard.Ctor)(NULL, card, Number(sameUUID));
    },
    Ctor2(card: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardInDiscard.Ctor2)(NULL, card, amount);
    },
};
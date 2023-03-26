import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MakeTempCardInDiscardAndDeckAction = {
    Ctor(card: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardInDiscardAndDeck.Ctor)(PatchHelper.nullptr, card);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RestoreRetainedCardsAction = {
    Ctor(cardGroupPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.RestoreRetainedCards.Ctor)(NULL, cardGroupPtr);
    },
};

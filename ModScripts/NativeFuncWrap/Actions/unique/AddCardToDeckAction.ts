import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const AddCardToDeckAction = {
    Ctor(cardPtr: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.AddCardToDeck.Ctor)(NULL, cardPtr);
    },
};
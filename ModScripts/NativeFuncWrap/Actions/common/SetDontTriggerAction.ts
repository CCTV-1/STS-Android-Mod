import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SetDontTriggerAction = {
    Ctor(cardPtr: NativePointer, dontTrigger: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.SetDontTrigger.Ctor)(NULL, cardPtr, Number(dontTrigger));
    },
};
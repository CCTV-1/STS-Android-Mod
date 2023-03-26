import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DiscardSpecificCardAction = {
    Ctor(targetCard: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.DiscardSpecificCard.Ctor)(PatchHelper.nullptr, targetCard);
    },
};
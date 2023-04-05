import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DiscardAtEndOfTurnAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.DiscardAtEndOfTurn.Ctor)(NULL);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const UpgradeRandomCardAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.UpgradeRandomCard.Ctor)(PatchHelper.nullptr);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SanctityAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Sanctity.Ctor)(NULL, amount);
    },
};

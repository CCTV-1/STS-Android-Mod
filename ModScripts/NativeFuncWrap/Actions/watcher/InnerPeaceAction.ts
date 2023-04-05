import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const InnerPeaceAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.InnerPeace.Ctor)(NULL, amount);
    },
};

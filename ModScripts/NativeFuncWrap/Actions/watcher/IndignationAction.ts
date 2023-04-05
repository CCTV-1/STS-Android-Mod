import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const IndignationAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Indignation.Ctor)(NULL, amount);
    },
};

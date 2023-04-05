import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const InstantKillAction = {
    Ctor(target: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.InstantKill.Ctor)(NULL, target);
    },
};
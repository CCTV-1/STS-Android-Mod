import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const BladeFuryAction = {
    Ctor(upgraded: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.BladeFury.Ctor)(NULL, Number(upgraded));
    },
};
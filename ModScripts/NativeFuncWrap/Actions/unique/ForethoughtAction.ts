import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ForethoughtAction = {
    Ctor(upgraded: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Forethought.Ctor)(NULL, Number(upgraded));
    },
};

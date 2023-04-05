import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ForeignInfluenceAction = {
    Ctor(upgraded: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.ForeignInfluence.Ctor)(NULL, Number(upgraded));
    },
};

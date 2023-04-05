import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const EmptyDeckShuffleAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.EmptyDeckShuffle.Ctor)(NULL);
    },
};
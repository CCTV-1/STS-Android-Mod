import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ShuffleAction = {
    /**
     * theGroup type is CardGroup
     */
    Ctor(theGroup: NativePointer, trigger: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Shuffle.Ctor)(NULL, theGroup, Number(trigger));
    },
};
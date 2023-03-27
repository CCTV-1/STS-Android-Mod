import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const EscapePlanAction = {
    Ctor(blockGain: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.EscapePlan.Ctor)(PatchHelper.nullptr, blockGain);
    },
};
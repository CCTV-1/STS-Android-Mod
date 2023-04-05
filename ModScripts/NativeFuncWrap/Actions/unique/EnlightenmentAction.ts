import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const EnlightenmentAction = {
    Ctor(forRestOfCombat: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Enlightenment.Ctor)(NULL, Number(forRestOfCombat));
    },
};
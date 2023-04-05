import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ExhaustAllNonAttackAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.ExhaustAllNonAttack.Ctor)(NULL);
    },
};
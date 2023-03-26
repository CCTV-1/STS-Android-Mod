import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const HealAction = {
    Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Heal.Ctor)(PatchHelper.nullptr, target, source, amount);
    }
};
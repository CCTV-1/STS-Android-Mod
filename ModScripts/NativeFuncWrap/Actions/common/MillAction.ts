import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MillAction = {
    Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Mill.Ctor)(PatchHelper.nullptr, target, source, amount);
    }
};
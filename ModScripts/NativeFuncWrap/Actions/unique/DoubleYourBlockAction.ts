import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DoubleYourBlockAction = {
    Ctor(targetCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.DoubleYourBlock.Ctor)(PatchHelper.nullptr, targetCreature);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RemoveAllBlockAction = {
    Ctor(targetCreature: NativePointer, sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RemoveAllBlock.Ctor)(NULL, targetCreature, sourceCreature);
    }
};
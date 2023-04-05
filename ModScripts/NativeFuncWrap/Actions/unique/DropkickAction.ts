import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DropkickAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Dropkick.Ctor)(NULL, targetCreature, dmgInfo);
    },
};
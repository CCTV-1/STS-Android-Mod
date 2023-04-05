import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const BaneAction = {
    Ctor(targetMonster: NativePointer, dmginfo: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Bane.Ctor)(NULL, targetMonster, dmginfo);
    },
};
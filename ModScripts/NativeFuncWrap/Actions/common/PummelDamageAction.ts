import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const PummelDamageAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.PummelDamage.Ctor)(PatchHelper.nullptr, targetCreature, dmgInfo);
    }
};
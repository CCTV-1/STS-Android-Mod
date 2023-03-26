import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DamageAction = {
    Ctor(target: NativePointer, dmgInfo: NativePointer, effect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Damage.Ctor)(PatchHelper.nullptr, target, dmgInfo, Number(effect));
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { AttackEffect } from "../../../enums.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const VampireDamageAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer, atkEffect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.VampireDamage.Ctor)(NULL, targetCreature, dmgInfo, Number(atkEffect));
    },
};

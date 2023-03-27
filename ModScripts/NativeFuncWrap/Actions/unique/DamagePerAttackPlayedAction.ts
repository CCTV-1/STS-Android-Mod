import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DamagePerAttackPlayedAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer, atkEffect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.DamagePerAttackPlayed.Ctor)(PatchHelper.nullptr, targetCreature, dmgInfo, atkEffect);
    },
};
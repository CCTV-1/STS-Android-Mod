import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DamageRandomEnemyAction = {
    Ctor(info: NativePointer, effect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.DamageRandomEnemy.Ctor)(NULL, info, Number(effect));
    },
};
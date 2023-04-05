import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const AttackDamageRandomEnemyAction = {
    Ctor(cardPtr: NativePointer, effect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.AttackDamageRandomEnemy.Ctor)(NULL, cardPtr, Number(effect));
    },
};
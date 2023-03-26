import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ApplyPowerToRandomEnemyAction = {
    Ctor(source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ApplyPowerToRandomEnemy.Ctor)(PatchHelper.nullptr, source, power, amount, Number(isFast), Number(effect));
    },
    Ctor2(source: NativePointer, power: NativePointer, amount: number): NativePointer {
        return ApplyPowerToRandomEnemyAction.Ctor(source, power, amount, false, AttackEffect.NONE);
    },
};
import { AttackEffect } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ApplyPowerAction = {
    Ctor(target: NativePointer, source: NativePointer, power: NativePointer, amount: number, isFast: boolean, effect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ApplyPower.Ctor)(PatchHelper.nullptr, target, source, power, amount, Number(isFast), Number(effect));
    },
    Ctor2(target: NativePointer, source: NativePointer, power: NativePointer, amount: number): NativePointer {
        return ApplyPowerAction.Ctor(target, source, power, amount, false, AttackEffect.NONE);
    },
};
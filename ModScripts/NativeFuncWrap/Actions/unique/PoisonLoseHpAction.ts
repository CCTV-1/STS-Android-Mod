import { PatchHelper } from "../../../PatchHelper.js";
import { AttackEffect } from "../../../enums.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const PoisonLoseHpAction = {
    Ctor(targetCreature: NativePointer, sourceCreature: NativePointer, amount: number, atkEffect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.PoisonLoseHp.Ctor)(NULL, targetCreature, sourceCreature, amount, Number(atkEffect));
    },
};

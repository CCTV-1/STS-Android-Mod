import { PatchHelper } from "../../../PatchHelper.js";
import { AttackEffect, DamageType } from "../../../enums.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const VampireDamageAllEnemiesAction = {
    /** JObjectArray\<int32_t\>* damageArr */
    Ctor(sourceCreature: NativePointer, damageArr: NativePointer, dmgType: DamageType, atkEffect: AttackEffect): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.VampireDamageAllEnemies.Ctor)(NULL, sourceCreature, damageArr, Number(dmgType),
            Number(atkEffect));
    },
};

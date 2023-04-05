import { AttackEffect, DamageType } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DamageAllEnemiesAction = {
    /**
     * @amounts java type: int[],TS type: JObjectArray\<int32_t\>
     */
    Ctor(source: NativePointer, amounts: NativePointer, type: DamageType, effect: AttackEffect, isFast: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.DamageAllEnemies.Ctor)(NULL, source, amounts, Number(type), Number(effect), Number(isFast));
    },
};
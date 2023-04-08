import { PatchHelper } from "../../../PatchHelper.js";
import { DamageType } from "../../../enums.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const WhirlwindAction = {
    /** JObjectArray\<int32_t\>* multiDamage */
    Ctor(plyaerPtr: NativePointer, damageArr: NativePointer, dmgType: DamageType, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Whirlwind.Ctor)(NULL, plyaerPtr, damageArr, Number(dmgType), Number(freeToPlayOnce),
            energyOnUse);
    },
};

import { PatchHelper } from "../../../PatchHelper.js";
import { DamageType } from "../../../enums.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SkewerAction = {
    Ctor(playerPtr: NativePointer, monsterPtr: NativePointer, damage: number, damageTypeForTurn: DamageType, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Skewer.Ctor)(NULL, playerPtr, monsterPtr, damage, Number(damageTypeForTurn),
            Number(freeToPlayOnce), energyOnUse);
    },
};

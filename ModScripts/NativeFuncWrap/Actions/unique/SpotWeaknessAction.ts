import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SpotWeaknessAction = {
    Ctor(damageIncrease: number, monsterPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.SpotWeakness.Ctor)(NULL, damageIncrease, monsterPtr);
    },
};

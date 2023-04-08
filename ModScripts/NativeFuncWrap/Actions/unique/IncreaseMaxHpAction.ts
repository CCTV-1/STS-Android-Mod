import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const IncreaseMaxHpAction = {
    Ctor(targetCreature: NativePointer, increasePercent: number, showEffect: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.IncreaseMaxHp.Ctor)(NULL, targetCreature, increasePercent, Number(showEffect));
    },
};

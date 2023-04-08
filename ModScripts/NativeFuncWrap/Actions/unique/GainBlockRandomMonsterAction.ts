import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const GainBlockRandomMonsterAction = {
    Ctor(sourceCreature: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.GainBlockRandomMonster.Ctor)(NULL, sourceCreature, amount);
    },
};

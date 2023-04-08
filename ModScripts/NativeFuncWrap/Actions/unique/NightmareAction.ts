import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const NightmareAction = {
    Ctor(targetCreature: NativePointer, sourceCreature: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Nightmare.Ctor)(NULL, targetCreature, sourceCreature, amount);
    },
};

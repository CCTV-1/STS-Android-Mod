import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RemoveDebuffsAction = {
    Ctor(targetCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.RemoveDebuffs.Ctor)(NULL, targetCreature);
    },
};

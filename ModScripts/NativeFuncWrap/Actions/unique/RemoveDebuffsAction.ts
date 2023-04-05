
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RemoveDebuffsAction = {
    Ctor(sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.RemoveDebuffs.Ctor)(NULL);
    },
};

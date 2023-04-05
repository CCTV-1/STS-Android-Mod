
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const NightmareAction = {
    Ctor(sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Nightmare.Ctor)(NULL);
    },
};

import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ConjureBladeAction = {
    Ctor(playerPtr: NativePointer, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.ConjureBlade.Ctor)(NULL, playerPtr, Number(freeToPlayOnce), energyOnUse);
    },
};

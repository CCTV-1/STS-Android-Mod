import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const TempestAction = {
    Ctor(playerPtr: NativePointer, energyOnUse: number, upgraded: boolean, freeToPlayOnce: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Tempest.Ctor)(NULL, playerPtr, energyOnUse, Number(upgraded), Number(freeToPlayOnce));
    },
};

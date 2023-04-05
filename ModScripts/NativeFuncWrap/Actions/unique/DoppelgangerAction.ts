import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DoppelgangerAction = {
    Ctor(playerPtr: NativePointer, upgraded: boolean, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Doppelganger.Ctor)(NULL, playerPtr,
            Number(upgraded), Number(freeToPlayOnce), energyOnUse);
    },
};
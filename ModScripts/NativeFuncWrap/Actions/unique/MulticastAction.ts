import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MulticastAction = {
    Ctor(playerPtr: NativePointer, upgraded: boolean, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Multicast.Ctor)(NULL, playerPtr, energyOnUse, Number(upgraded), Number(freeToPlayOnce));
    },
};

import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const TransmutationAction = {
    Ctor(playerPtr: NativePointer, upgraded: boolean, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Transmutation.Ctor)(NULL, playerPtr, Number(upgraded), Number(freeToPlayOnce),
            energyOnUse);
    },
};

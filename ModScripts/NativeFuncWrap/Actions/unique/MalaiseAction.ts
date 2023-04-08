import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MalaiseAction = {
    Ctor(playerPtr: NativePointer, monsterPtr: NativePointer, upgraded: boolean, freeToPlayOnce: boolean, energyOnUse: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Malaise.Ctor)(NULL, playerPtr, monsterPtr, Number(upgraded), Number(freeToPlayOnce),
            energyOnUse);
    },
};

import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const CollectAction = {
    Ctor(playerPtr: NativePointer, freeToPlayOnce: boolean, energyOnUse: number, upgraded: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Collect.Ctor)(PatchHelper.nullptr, playerPtr, Number(freeToPlayOnce), energyOnUse, Number(upgraded));
    },
};

import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const WrathNextTurnPower = {
    Ctor(owner: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.WrathNextTurn.Ctor)(NULL, owner);
    }
};
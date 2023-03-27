import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const EndTurnDeathPower = {
    Ctor(owner: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.EndTurnDeath.Ctor)(PatchHelper.nullptr, owner);
    }
};
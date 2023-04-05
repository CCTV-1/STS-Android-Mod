import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const WaveOfTheHandPower = {
    Ctor(owner: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.WaveOfTheHand.Ctor)(NULL, owner, amount);
    }
};
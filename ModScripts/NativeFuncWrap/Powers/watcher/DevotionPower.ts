import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const DevotionPower = {
    Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Devotion.Ctor)(NULL, owner, strengthAmount);
    }
};
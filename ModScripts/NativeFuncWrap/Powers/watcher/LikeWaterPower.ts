import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const LikeWaterPower = {
    Ctor(owner: NativePointer, amt: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.LikeWater.Ctor)(NULL, owner, amt);
    }
};
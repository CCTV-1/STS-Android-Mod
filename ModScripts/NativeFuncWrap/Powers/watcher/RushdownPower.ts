import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const RushdownPower = {
    Ctor(owner: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Rushdown.Ctor)(NULL, owner, amount);
    }
};
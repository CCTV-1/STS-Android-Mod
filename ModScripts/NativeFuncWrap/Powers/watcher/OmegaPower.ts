import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const OmegaPower = {
    Ctor(owner: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Omega.Ctor)(NULL, owner, amount);
    }
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const ForesightPower = {
    Ctor(owner: NativePointer, scryAmt: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Foresight.Ctor)(NULL, owner, scryAmt);
    }
};
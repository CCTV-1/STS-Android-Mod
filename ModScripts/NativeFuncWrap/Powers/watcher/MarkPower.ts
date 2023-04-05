import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const MarkPower = {
    Ctor(owner: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Mark.Ctor)(NULL, owner, amount);
    }
};
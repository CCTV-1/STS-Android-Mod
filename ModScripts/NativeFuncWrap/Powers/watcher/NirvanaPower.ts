import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const NirvanaPower = {
    Ctor(owner: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Nirvana.Ctor)(NULL, owner, amount);
    }
};
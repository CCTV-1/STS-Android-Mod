import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const EstablishmentPower = {
    Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.Establishment.Ctor)(NULL, owner, strengthAmount);
    }
};
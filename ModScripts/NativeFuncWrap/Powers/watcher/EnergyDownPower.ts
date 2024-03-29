import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const EnergyDownPower = {
    Ctor(owner: NativePointer, strengthAmount: number, isFasting: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.watcher.EnergyDown.Ctor)(NULL, owner, strengthAmount, Number(isFasting));
    }
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const IntangiblePlayerPower = {
    Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.common.IntangiblePlayer.Ctor)(NULL, owner, strengthAmount);
    }
};
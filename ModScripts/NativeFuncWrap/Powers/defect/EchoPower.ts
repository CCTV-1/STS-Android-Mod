import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const EchoPower = {
    Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.defect.Echo.Ctor)(NULL, owner, strengthAmount);
    }
};
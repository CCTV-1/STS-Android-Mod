import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const DemonFormPower = {
    Ctor(owner: NativePointer, strengthAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.ironclad.DemonForm.Ctor)(NULL, owner, strengthAmount);
    }
};
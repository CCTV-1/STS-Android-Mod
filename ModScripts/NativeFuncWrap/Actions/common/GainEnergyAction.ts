import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const GainEnergyAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.GainEnergy.Ctor)(NULL, amount);
    },
};
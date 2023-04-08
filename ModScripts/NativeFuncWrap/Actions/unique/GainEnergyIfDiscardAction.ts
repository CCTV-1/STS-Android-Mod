import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const GainEnergyIfDiscardAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.GainEnergyIfDiscard.Ctor)(NULL, amount);
    },
};

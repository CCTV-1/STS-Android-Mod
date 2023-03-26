import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const GainEnergyAndEnableControlsAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.GainEnergyAndEnableControls.Ctor)(PatchHelper.nullptr, amount);
    },
};
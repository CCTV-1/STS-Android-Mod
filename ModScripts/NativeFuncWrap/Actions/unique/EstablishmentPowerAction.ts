import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const EstablishmentPowerAction = {
    Ctor(discountAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.EstablishmentPower.Ctor)(PatchHelper.nullptr, discountAmount);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const ConfusionPower = {
    OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
        return PatchHelper.HookSTSFunction(NativePowerInfo.common.Confusion.onCardDraw, newCallback);
    }
};
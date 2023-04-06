import { PatchHelper } from "../../../PatchHelper.js";
import { NativePowerInfo } from "../NativePowerInfo.js";

export const ConfusionPower = {
    Ctor(owner: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativePowerInfo.common.Confusion.Ctor)(NULL, owner);
    },
    OverrideonCardDraw(newCallback: (thisPtr: NativePointer, cardPtr: NativePointer) => void): (thisPtr: NativePointer, cardPtr: NativePointer) => void {
        return PatchHelper.HookSTSFunction(NativePowerInfo.common.Confusion.onCardDraw, newCallback);
    }
};
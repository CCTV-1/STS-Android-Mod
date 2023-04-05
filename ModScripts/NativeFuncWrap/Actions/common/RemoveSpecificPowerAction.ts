import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RemoveSpecificPowerAction = {
    Ctor(target: NativePointer, source: NativePointer, powerName: string): NativePointer {
        let nativePowerName = NativeSTDLib.JString.Ctor(powerName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RemoveSpecificPower.Ctor)(NULL, target, source, nativePowerName);
    },
    Ctor2(target: NativePointer, source: NativePointer, powerInstance: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RemoveSpecificPower.Ctor2)(NULL, target, source, powerInstance);
    },
};
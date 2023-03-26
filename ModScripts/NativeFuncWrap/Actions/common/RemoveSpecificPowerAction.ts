import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTSLib } from "../../NativeSTSLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RemoveSpecificPowerAction = {
    Ctor(target: NativePointer, source: NativePointer, powerName: string): NativePointer {
        let nativePowerName = NativeSTSLib.JString.Ctor(powerName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RemoveSpecificPower.Ctor)(PatchHelper.nullptr, target, source, nativePowerName);
    },
    Ctor2(target: NativePointer, source: NativePointer, powerInstance: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RemoveSpecificPower.Ctor2)(PatchHelper.nullptr, target, source, powerInstance);
    },
};
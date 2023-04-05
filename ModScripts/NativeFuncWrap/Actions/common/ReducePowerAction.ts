import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTDLib } from "../../NativeSTDLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ReducePowerAction = {
    Ctor(target: NativePointer, source: NativePointer, powerName: string, amount: number): NativePointer {
        let nativePowerName = NativeSTDLib.JString.Ctor(powerName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ReducePower.Ctor)(NULL, target, source, nativePowerName, amount);
    },
    Ctor2(target: NativePointer, source: NativePointer, powerInstance: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ReducePower.Ctor2)(NULL, target, source, powerInstance, amount);
    },
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTSLib } from "../../NativeSTSLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ReducePowerAction = {
    Ctor(target: NativePointer, source: NativePointer, powerName: string, amount: number): NativePointer {
        let nativePowerName = NativeSTSLib.JString.Ctor(powerName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ReducePower.Ctor)(PatchHelper.nullptr, target, source, nativePowerName, amount);
    },
    Ctor2(target: NativePointer, source: NativePointer, powerInstance: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.ReducePower.Ctor2)(PatchHelper.nullptr, target, source, powerInstance, amount);
    },
};
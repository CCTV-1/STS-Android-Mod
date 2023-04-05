import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ExhaustAction = {
    Ctor(amount: number, isRandom: boolean, anyNumber: boolean, canPickZero: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Exhaust.Ctor)(NULL, amount, Number(isRandom), Number(anyNumber), Number(canPickZero));
    },
    Ctor2(amount: number, isRandom: boolean, anyNumber: boolean, canPickZero: boolean, duration: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Exhaust.Ctor)(NULL, amount, Number(isRandom), Number(anyNumber), Number(canPickZero), duration);
    },
};
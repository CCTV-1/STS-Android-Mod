import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const GainBlockAction = {
    Ctor(target: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.GainBlock.Ctor)(NULL, target, amount);
    },
    Ctor2(target: NativePointer, source: NativePointer, amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.GainBlock.Ctor2)(NULL, target, source, amount);
    },
    Ctor3(target: NativePointer, amount: number, superFast: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.GainBlock.Ctor3)(NULL, target, amount, Number(superFast));
    },
    Ctor4(target: NativePointer, source: NativePointer, amount: number, superFast: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.GainBlock.Ctor4)(NULL, target, source, amount, Number(superFast));
    },
};
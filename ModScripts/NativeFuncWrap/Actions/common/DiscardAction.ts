import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DiscardAction = {
    Ctor(target: NativePointer, source: NativePointer, amount: number): NativePointer {
        return DiscardAction.Ctor2(target, source, amount, false, false);
    },
    Ctor2(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean, endTurn: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.Discard.Ctor2)(NULL, target, source, amount, Number(isRandom), Number(endTurn));
    },
};
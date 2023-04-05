import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const AttackFromDeckToHandAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.AttackFromDeckToHand.Ctor)(NULL, amount);
    },
};
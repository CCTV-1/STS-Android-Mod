import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const BlockPerNonAttackAction = {
    Ctor(blockAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.BlockPerNonAttack.Ctor)(NULL, blockAmount);
    },
};
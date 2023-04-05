import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RollMoveAction = {
    Ctor(monster: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RollMove.Ctor)(NULL, monster);
    },
};
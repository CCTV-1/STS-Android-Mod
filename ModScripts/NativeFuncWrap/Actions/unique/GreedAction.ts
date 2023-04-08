import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const GreedAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer, goldAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Greed.Ctor)(NULL, targetCreature, dmgInfo, goldAmount);
    },
};

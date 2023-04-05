import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const FeedAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer, maxHPAmount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.Feed.Ctor)(NULL, targetCreature, dmgInfo, maxHPAmount);
    },
};
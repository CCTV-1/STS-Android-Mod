import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MakeTempCardAtBottomOfDeckAction = {
    Ctor(amount: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardAtBottomOfDeck.Ctor)(NULL, amount);
    },
};
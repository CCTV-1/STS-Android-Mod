import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const PutOnDeckAction = {
    Ctor(target: NativePointer, source: NativePointer, amount: number, isRandom: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.PutOnDeck.Ctor)(PatchHelper.nullptr, target, source, amount, Number(isRandom));
    }
};
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const PlayTopCardAction = {
    Ctor(targetCreature: NativePointer, exhausts: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.PlayTopCard.Ctor)(PatchHelper.nullptr, targetCreature, exhausts);
    }
};
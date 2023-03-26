import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const RelicAboveCreatureAction = {
    Ctor(creaturePtr: NativePointer, relicPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.RelicAboveCreature.Ctor)(PatchHelper.nullptr, creaturePtr, relicPtr);
    }
};
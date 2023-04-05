import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const ExpungeVFXAction = {
    Ctor(monsterPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.ExpungeVFX.Ctor)(NULL, monsterPtr);
    },
};

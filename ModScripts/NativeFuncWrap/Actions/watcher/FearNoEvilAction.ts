import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const FearNoEvilAction = {
    Ctor(monsterPtr: NativePointer, dmgInfo: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.FearNoEvil.Ctor)(PatchHelper.nullptr, monsterPtr, dmgInfo);
    },
};

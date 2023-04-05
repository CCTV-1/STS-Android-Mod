import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const WallopAction = {
    Ctor(targetCreature: NativePointer, dmgInfo: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Wallop.Ctor)(PatchHelper.nullptr, targetCreature, dmgInfo);
    },
};

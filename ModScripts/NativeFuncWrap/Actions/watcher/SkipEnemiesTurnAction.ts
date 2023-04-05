import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SkipEnemiesTurnAction = {
    Ctor(): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.SkipEnemiesTurn.Ctor)(NULL);
    },
};

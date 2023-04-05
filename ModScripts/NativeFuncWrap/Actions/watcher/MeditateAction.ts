import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MeditateAction = {
    Ctor(numCards: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Meditate.Ctor)(PatchHelper.nullptr, numCards);
    },
};

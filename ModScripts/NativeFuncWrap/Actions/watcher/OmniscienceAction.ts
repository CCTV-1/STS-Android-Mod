import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const OmniscienceAction = {
    Ctor(numberOfCards: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.watcher.Omniscience.Ctor)(NULL, numberOfCards);
    },
};
